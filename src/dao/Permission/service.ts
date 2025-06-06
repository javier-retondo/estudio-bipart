import { Transaction } from 'sequelize';
import { IPermission } from './interface';
import { Permission } from './model';

class PermissionService {
   async createUserPermissions(
      userId: number,
      permissions: Omit<IPermission, 'user_id' | 'id'>[],
      transaction?: Transaction,
   ): Promise<IPermission[]> {
      const permissionsToCreate = permissions.map((permission) => ({
         ...permission,
         user_id: userId,
      }));
      return (await Permission.bulkCreate(permissionsToCreate, { transaction })).map((permission) =>
         permission.get({ plain: true }),
      );
   }

   async deleteUserPermissions(userId: number, transaction?: Transaction): Promise<boolean> {
      const deletedCount = await Permission.destroy({
         where: { user_id: userId },
         transaction,
      });
      return deletedCount > 0;
   }
}

export const permissionService = new PermissionService();
