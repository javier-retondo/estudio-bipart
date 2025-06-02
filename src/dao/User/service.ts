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

class UserService {
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

   async createUser(
      firstname: string,
      lastname: string,
      username: string,
      email: string,
      phone: string,
      is_admin: boolean,
   ): Promise<IUser> {
      const name = `${firstname} ${lastname}`;
      const password = Math.random().toString(36).slice(-8);
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
         firstname,
         lastname,
         username,
         email,
         phone,
         is_admin,
         password: encryptedPassword,
         is_pass_provisory: true,
      });

      const html = await ejs.renderFile(join('templates', 'welcome.ejs'), {
         nombre: name,
         usuario: username,
         password: password,
      });

      await sendEmail(email, 'Bienvenido a la plataforma', html);
      delete user.dataValues.password;
      return user.dataValues;
   }

   async updateUser(id: number, data: Partial<IUser>): Promise<IUser> {
      const user = await this.getUserModelById(id);
      if (!user) {
         throw new Error(`User with id ${id} not found`);
      }

      await user.update({
         ...data,
         password: data.password ? await bcrypt.hash(data.password, 10) : user.dataValues.password,
         is_pass_provisory: data.password ? false : undefined,
      });

      delete user.dataValues.password;
      await this.invalidateUserData(id);
      return user.dataValues;
   }

   async deleteUser(id: string) {
      const user = await User.findByPk(id);
      if (!user) {
         throw new Error(`User with id ${id} not found`);
      }

      await user.destroy();
      return { message: `User with id ${id} deleted successfully` };
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
}

const userService = new UserService();
export { userService };
