import { DB_RESTRICTIONS } from '../../utils/constants/DB_RESTRICIONS';
import { PERMISSION } from '../metadata';
import { Permission } from '../models';
import { USER } from './metadata';
import { User } from './model';

export const initUserAssociations = () => {
   console.log('   🔄 Users Associations is starting...');
   User.hasMany(Permission, {
      sourceKey: USER.COLUMNS.ID,
      foreignKey: PERMISSION.COLUMNS.USER_ID,
      as: USER.ASSOCIATIONS.PERMISSIONS,
      onDelete: DB_RESTRICTIONS.CASCADE,
      onUpdate: DB_RESTRICTIONS.CASCADE,
   });
};
