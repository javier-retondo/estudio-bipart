import { join } from 'path';
import sendEmail from '../../utils/mailer/nodemailer';
import { Permission } from '../models';
import { USER } from './metadata';
import { User } from './model';
import bcrypt from 'bcrypt';
import ejs from 'ejs';
import { IUser } from './interface';
import jwt from 'jsonwebtoken';
import { redisClient } from '../../config/redisManager';
import { moduleService } from '../Module/service';
import { FindOptions, Includeable, Transaction, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';

class UserService {
   private getAllAttributes(attributesIncludes: (keyof IUser)[]): (keyof IUser)[] {
      return Object.values(USER.COLUMNS).filter((column) => attributesIncludes.includes(column));
   }
   private getAllAssociations(includes: (keyof IUser)[]): Includeable[] {
      return Object.values(USER.ASSOCIATIONS)
         .filter((association) => includes.includes(association))
         .map((association) => {
            if (association === USER.ASSOCIATIONS.PERMISSIONS) {
               return {
                  model: Permission,
                  as: association,
                  required: false,
               };
            }
            return undefined;
         })
         .filter((item) => item !== undefined);
   }

   private async getUserModelById(id: number) {
      return await User.findByPk(id, {
         include: [
            {
               model: Permission,
               as: USER.ASSOCIATIONS.PERMISSIONS,
               required: false,
            },
         ],
      }).then((user) => {
         if (!user) {
            throw new Error(`User with id ${id} not found`);
         }
         return user;
      });
   }

   private async invalidateUserData(id: number) {
      const userTokensKey = `user_tokens:${id}`;
      const token = await redisClient.get(userTokensKey);

      if (token) {
         await redisClient.del(`session:${String(token)}`);
         await redisClient.del(userTokensKey);
      }
   }

   async getUserById(id: number): Promise<IUser> {
      return await User.findByPk(id, {
         include: [
            {
               model: Permission,
               as: USER.ASSOCIATIONS.PERMISSIONS,
               required: false,
            },
         ],
      }).then(async (user) => {
         if (!user) {
            throw new Error(`User with id ${id} not found`);
         }
         delete user.dataValues.password;
         const modules = await moduleService.getModules({
            isAdmin: user.dataValues.is_admin,
            modulesIds:
               user.dataValues.Permissions?.map((permission) => permission.module_id) || [],
         });
         user.dataValues.Modules = modules;
         return user.dataValues;
      });
   }

   async getUserByCriteria(
      criteria: Partial<{ id: number; email: string; username: string }>,
   ): Promise<IUser | null> {
      return await User.findOne({
         where: criteria,
         include: [
            {
               model: Permission,
               as: USER.ASSOCIATIONS.PERMISSIONS,
               required: false,
            },
         ],
      }).then((user) => {
         if (!user) {
            return null;
         }
         const userData = user.dataValues as IUser;
         delete userData.password;
         return userData;
      });
   }

   async getUsers(
      {
         page = 1,
         pageSize = 10,
         sortBy = 'id',
         sortDesc = 'DESC',
      }: {
         page?: number;
         pageSize?: number;
         sortBy?: string;
         sortDesc?: 'ASC' | 'DESC';
      },
      search?: string,
      columns?: (keyof IUser)[],
      associations?: (keyof IUser)[],
   ): Promise<{ count: number; rows: IUser[] }> {
      let where: WhereOptions<IUser> = { is_admin: false };
      if (search) {
         where = {
            ...where,
            [Op.or]: [
               { firstname: { [Op.like]: `%${search}%` } },
               { lastname: { [Op.like]: `%${search}%` } },
               { username: { [Op.like]: `%${search}%` } },
               { email: { [Op.like]: `%${search}%` } },
               { phone: { [Op.like]: `%${search}%` } },
            ],
         };
      }
      const attributes: (keyof IUser)[] = this.getAllAttributes(
         columns || Object.values(USER.COLUMNS),
      );
      const include: Includeable[] | undefined = associations
         ? this.getAllAssociations(associations)
         : undefined;

      const options: FindOptions = {
         attributes,
         where,
         order: [[sortBy, sortDesc]],
         limit: pageSize,
         offset: (page - 1) * pageSize,
         include,
      };

      const modules = associations?.includes('Modules')
         ? await moduleService.getAllModules()
         : undefined;

      return await User.findAndCountAll(options).then((result) => {
         return {
            count: result.count,
            rows: result.rows.map((user) => {
               const userData = user.dataValues as IUser;
               delete userData.password;
               userData.Modules =
                  modules &&
                  modules.filter((module) =>
                     userData.Permissions?.some((permission) => permission.module_id === module.id),
                  );
               return userData;
            }),
         };
      });
   }

   async createUser(
      firstname: string,
      lastname: string,
      username: string,
      email: string,
      phone?: string,
      is_admin?: boolean,
      userData?: IUser,
      transaction?: Transaction,
   ): Promise<IUser> {
      const name = `${firstname} ${lastname}`;
      const password = Math.random().toString(36).slice(-8);
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create(
         {
            firstname,
            lastname,
            username,
            email,
            phone,
            is_admin,
            password: encryptedPassword,
            is_pass_provisory: true,
            created_by: userData?.id || null,
         },
         { transaction },
      );

      const html = await ejs.renderFile(join('templates', 'welcome.ejs'), {
         nombre: name,
         usuario: username,
         password: password,
      });
      setImmediate(() => {
         sendEmail(email, 'Bienvenido a la plataforma', html);
      });
      delete user.dataValues.password;
      return user.dataValues;
   }

   async updateUser(
      id: number,
      data: Partial<IUser>,
      userData: IUser,
      transaction?: Transaction,
   ): Promise<IUser> {
      const user = await this.getUserModelById(id);
      if (!user) {
         throw new Error(`User with id ${id} not found`);
      }

      await user.update(
         {
            ...data,
            password: data.password
               ? await bcrypt.hash(data.password, 10)
               : user.dataValues.password,
            is_pass_provisory:
               data.password && !data.is_pass_provisory ? false : data.is_pass_provisory,
            updated_by: userData.id as number,
            updated_at: new Date(),
         },
         { transaction },
      );

      delete user.dataValues.password;
      await this.invalidateUserData(id);
      return user.dataValues;
   }

   async deleteUser(id: number, userData: IUser): Promise<IUser> {
      return await this.updateUser(
         id,
         {
            deleted_at: new Date(),
            deleted_by: userData.id as number,
         },
         userData,
      );
   }

   async login(username: string, password: string): Promise<{ user: IUser; token: string }> {
      const user = await User.findOne({
         where: { username },
         include: [
            {
               model: Permission,
               as: USER.ASSOCIATIONS.PERMISSIONS,
               required: false,
            },
         ],
      });

      if (!user || !user.dataValues.password) {
         throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);
      if (!isPasswordValid) {
         throw new Error('Invalid password');
      }

      const token = jwt.sign(
         {
            id: user.dataValues.id,
            username: user.dataValues.username,
         },
         process.env.SECRET_KEY || 'defaultsecret',
         { expiresIn: '12h' },
      );
      delete user.dataValues.password;
      await redisClient.set(`user_tokens:${user.dataValues.id}`, token, 60 * 60 * 12);
      const modules = await moduleService.getModules({
         isAdmin: user.dataValues.is_admin,
         modulesIds: user.dataValues.Permissions?.map((permission) => permission.module_id) || [],
      });

      return {
         user: {
            ...user.dataValues,
            Modules: modules,
         },
         token,
      };
   }

   async resetPassword(userId: number, userData: IUser): Promise<string> {
      const newPassword = Math.random().toString(36).slice(-8);
      const user = await this.updateUser(
         userId,
         {
            password: newPassword,
         },
         userData,
      );

      const html = await ejs.renderFile(join('templates', 'welcome.ejs'), {
         nombre: user.firstname + ' ' + user.lastname,
         usuario: user.username,
         password: newPassword,
      });
      setImmediate(() => {
         sendEmail(user.email, 'Restablecimiento de contraseña', html);
      });

      return `Contraseña restablecida correctamente. Se ha enviado un correo a ${user.email} con la nueva contraseña.`;
   }

   async userCheckExists(
      criteria: Partial<{ id: number; email: string; username: string }>,
   ): Promise<boolean> {
      const user = await User.findOne({
         where: criteria,
         attributes: ['id'],
      });
      return !!user;
   }
}

const userService = new UserService();
export { userService };
