import { TEAM } from '../metadata';
import { Team } from '../models';
import { BALANCE } from './metadata';
import { Balance } from './model';

export const initBalanceAssociations = () => {
   console.log('   🔄Balance Associations is starting...');
   Balance.belongsTo(Team, {
      foreignKey: BALANCE.COLUMNS.TEAM_ID,
      targetKey: TEAM.COLUMNS.ID,
      as: BALANCE.ASSOCIATIONS.TEAM,
   });
};
