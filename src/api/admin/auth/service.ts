import { sequelize } from '../../../config';
import { IUser } from '../../../dao/interfaces';
import { userService } from '../../../dao/User/service';

class AuthServices {
   private async handleTransaction<T>(operation: (transaction: any) => Promise<T>): Promise<T> {
      const transaction = await sequelize.transaction();
      const result = await operation(transaction);
      await transaction.commit();
      return result;
   }

   async login(username: string, password: string): Promise<{ user: IUser; token: string }> {
      return userService.login(username, password);
   }

   async changePassword(userId: number, newPassword: string, userData: IUser): Promise<IUser> {
      return await userService.updateUser(userId, { password: newPassword }, userData);
   }

   async resetPassword(userData: IUser): Promise<string> {
      return await userService.resetPassword(userData.id as number, userData);
   }
}

const authServices = new AuthServices();
export { authServices };
