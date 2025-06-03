import { User } from '../models';
import { TEAM } from './metadata';
import { Team } from './model';

export const initTeamAssociations = () => {
   console.log('   🔄Team Associations is starting...');
   Team.belongsTo(User, {
      foreignKey: TEAM.COLUMNS.CREATED_BY,
      as: TEAM.ASSOCIATIONS.USER_CREATED_BY,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
   });
   Team.belongsTo(User, {
      foreignKey: TEAM.COLUMNS.UPDATED_BY,
      as: TEAM.ASSOCIATIONS.USER_UPDATED_BY,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
   });
   Team.belongsTo(User, {
      foreignKey: TEAM.COLUMNS.DELETED_BY,
      as: TEAM.ASSOCIATIONS.USER_DELETED_BY,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
   });
   Team.belongsTo(User, {
      foreignKey: TEAM.COLUMNS.SUSPENDED_BY,
      as: TEAM.ASSOCIATIONS.USER_SUSPENDED_BY,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
   });
};
