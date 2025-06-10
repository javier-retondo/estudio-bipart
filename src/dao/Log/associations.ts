import { USER } from '../metadata';
import { User } from '../models';
import { LOG } from './metadata';
import { Log } from './model';

export const initLogAssociations = () => {
   console.log('   🔄Log Associations is starting...');
   Log.belongsTo(User, {
      foreignKey: LOG.COLUMNS.USER_ID,
      targetKey: USER.COLUMNS.ID,
      as: LOG.ASSOCIATIONS.USER,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
   });
};
