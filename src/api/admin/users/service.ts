import { sequelize } from '../../../config';
import { commercialClientService } from '../../../dao/CommercialClient/service';
import { IUser } from '../../../dao/interfaces';
import { COMMERCIAL_CLIENT } from '../../../dao/metadata';
import { userService } from '../../../dao/User/service';
import { UsersFilterDTO, CreateUserDTO, UpdateUserDTO } from './dto';

class UserServices {
   private async handleTransaction<T>(operation: (transaction: any) => Promise<T>): Promise<T> {
      const transaction = await sequelize.transaction();
      const result = await operation(transaction);
      await transaction.commit();
      return result;
   }

   async createUser(createUserDTO: CreateUserDTO, userData: IUser) {
      const { username, email, firstname, lastname, phone } = createUserDTO;
      return await userService.createUser(
         firstname,
         lastname,
         username,
         email,
         phone,
         false,
         userData,
      );
   }

   async updateUser(userId: number, updateUserDTO: UpdateUserDTO, userData: IUser) {
      const { firstname, lastname, username, email, phone } = updateUserDTO;
      return await userService.updateUser(
         userId,
         {
            firstname,
            lastname,
            username,
            email,
            phone,
         },
         userData,
      );
   }

   async getUsers(UsersFilterDTO: UsersFilterDTO) {
      const { page, pageSize, sortBy, sortDesc, search } = UsersFilterDTO;
      console.log('search :>> ', search);
      return userService.getUsers(
         {
            page: page || 1,
            pageSize: pageSize || 10,
            sortBy: sortBy || 'id',
            sortDesc: sortDesc ? 'ASC' : 'DESC',
         },
         search,
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
