import { TEAM } from '../metadata';
import { Team } from '../models';
import { RISK_PRODUCT } from './metadata';
import { RiskProduct } from './model';

export const initRiskProductAssociations = () => {
   console.log('🚀 RiskProduct Associations is starting...');
   RiskProduct.belongsTo(Team, {
      foreignKey: RISK_PRODUCT.COLUMNS.TEAM_ID,
      targetKey: TEAM.COLUMNS.ID,
      as: RISK_PRODUCT.ASSOCIATIONS.TEAM,
   });
};
