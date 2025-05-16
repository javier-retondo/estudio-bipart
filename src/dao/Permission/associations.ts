import { COMMERCIAL_CLIENT, MODULE, PERMISSION, USER } from '../metadata';
import { CommercialClient, Module, User } from '../models';
import { Permission } from './model';

export const initPermissionAssociations = () => {
   console.log('   🔄 Permissions Associations is starting...');
   Permission.belongsTo(User, {
      foreignKey: PERMISSION.COLUMNS.USER_ID,
      targetKey: USER.COLUMNS.ID,
      as: PERMISSION.ASSOCIATIONS.USER,
   });

   Permission.belongsTo(Module, {
      foreignKey: PERMISSION.COLUMNS.MODULE_ID,
      targetKey: MODULE.COLUMNS.ID,
      as: PERMISSION.ASSOCIATIONS.MODULE,
   });

   Permission.belongsTo(CommercialClient, {
      foreignKey: PERMISSION.COLUMNS.COMMERCIAL_CLIENT_ID,
      targetKey: COMMERCIAL_CLIENT.COLUMNS.ID,
      as: PERMISSION.ASSOCIATIONS.COMMERCIAL_CLIENT,
   });
};
