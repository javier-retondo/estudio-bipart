import { sequelize } from '../../../config';
import { commercialClientService } from '../../../dao/CommercialClient/service';
import { IPermission, IUser } from '../../../dao/interfaces';
import { COMMERCIAL_CLIENT, USER } from '../../../dao/metadata';
import { permissionService } from '../../../dao/Permission/service';
import { userService } from '../../../dao/User/service';
import { UsersFilterDTO, CreateUserDTO, UpdateUserDTO } from './dto';

class UserServices {
   private async handleTransaction<T>(operation: (transaction: any) => Promise<T>): Promise<T> {
      const transaction = await sequelize.transaction();
      const result = await operation(transaction);
      await transaction.commit();
      return result;
   }

   async createUser(
      createUserDTO: CreateUserDTO,
      userData: IUser,
   ): Promise<{
      user: IUser;
      Permissions: IPermission[];
   }> {
      const { username, email, firstname, lastname, phone, Permissions } = createUserDTO;
      return this.handleTransaction(async (transaction) => {
         const newUser = await userService.createUser(
            firstname,
            lastname,
            username,
            email,
            phone,
            false,
            userData,
            transaction,
         );

         if (!newUser || !newUser.id) {
            throw new Error('Error creating user');
         }

         const newPermissions =
            Permissions && Permissions.length > 0
               ? await permissionService.createUserPermissions(newUser.id, Permissions, transaction)
               : [];

         return {
            user: newUser,
            Permissions: newPermissions,
         };
      });
   }

   async updateUser(userId: number, updateUserDTO: UpdateUserDTO, userData: IUser) {
      const { firstname, lastname, username, email, phone, Permissions } = updateUserDTO;
      return this.handleTransaction(async (transaction) => {
         const updatedUser = await userService.updateUser(
            userId,
            {
               firstname,
               lastname,
               username,
               email,
               phone,
            },
            userData,
            transaction,
         );

         if (!updatedUser || !updatedUser.id) {
            throw new Error('Error updating user');
         }

         if (Permissions && Permissions.length > 0) {
            await permissionService.deleteUserPermissions(userId, transaction);
            const newPermissions = await permissionService.createUserPermissions(
               userId,
               Permissions,
               transaction,
            );
            return { ...updatedUser, Permissions: newPermissions };
         }

         return updatedUser;
      });
   }

   async getUsers(UsersFilterDTO: UsersFilterDTO) {
      const { page, pageSize, sortBy, sortDesc, search } = UsersFilterDTO;
      return userService.getUsers(
         {
            page: page || 1,
            pageSize: pageSize || 10,
            sortBy: sortBy || 'id',
            sortDesc: sortDesc ? 'ASC' : 'DESC',
         },
         search,
         undefined,
         [USER.ASSOCIATIONS.PERMISSIONS, 'Modules'],
      );
   }

   async getUser(userId: number) {
      return await userService.getUserById(userId);
   }

   async softDeleteUser(userId: number, userData: IUser) {
      return await userService.deleteUser(userId, userData);
   }

   async getCommercialClients() {
      return await commercialClientService.getCommercialClients(
         [
            COMMERCIAL_CLIENT.COLUMNS.ID,
            COMMERCIAL_CLIENT.COLUMNS.FISCAL_NAME,
            COMMERCIAL_CLIENT.COLUMNS.FISCAL_NUMBER,
         ],
         [],
         undefined,
         undefined,
         COMMERCIAL_CLIENT.COLUMNS.ID,
         'ASC',
      );
   }
}

const userServices = new UserServices();
export { userServices };
