import { DIVISION, GROSS_INCOME, MONOTRIBUTIST, PYME_PRODUCT, TEAM, USER } from '../metadata';
import { Division, GrossIncome, Monotributist, PymeProduct, Team, User } from '../models';
import { PYME_PROD_USAGE } from './metadata';
import { PymeProdUsage } from './model';

export const initPymeProductUsageAssociations = () => {
   console.log('   🔄PymeProductUsage Associations is starting...');
   PymeProdUsage.belongsTo(PymeProduct, {
      foreignKey: PYME_PROD_USAGE.COLUMNS.PYME_PRODUCT_ID,
      targetKey: PYME_PRODUCT.COLUMNS.ID,
      as: PYME_PROD_USAGE.ASSOCIATIONS.PYME_PRODUCT,
   });

   PymeProdUsage.belongsTo(Division, {
      foreignKey: PYME_PROD_USAGE.COLUMNS.DIVISION_ID,
      targetKey: DIVISION.COLUMNS.ID,
      as: PYME_PROD_USAGE.ASSOCIATIONS.DIVISION,
   });

   PymeProdUsage.belongsTo(GrossIncome, {
      foreignKey: PYME_PROD_USAGE.COLUMNS.GROSS_INCOME_ID,
      targetKey: GROSS_INCOME.COLUMNS.ID,
      as: PYME_PROD_USAGE.ASSOCIATIONS.GROSS_INCOME,
   });

   PymeProdUsage.belongsTo(Monotributist, {
      foreignKey: PYME_PROD_USAGE.COLUMNS.MONOTRIBUTIST_ID,
      targetKey: MONOTRIBUTIST.COLUMNS.ID,
      as: PYME_PROD_USAGE.ASSOCIATIONS.MONOTRIBUTIST,
   });

   PymeProdUsage.belongsTo(Team, {
      foreignKey: PYME_PROD_USAGE.COLUMNS.TEAM_ID,
      targetKey: TEAM.COLUMNS.ID,
      as: PYME_PROD_USAGE.ASSOCIATIONS.TEAM,
   });

   PymeProdUsage.belongsTo(User, {
      foreignKey: PYME_PROD_USAGE.COLUMNS.USER_ID,
      targetKey: USER.COLUMNS.ID,
      as: PYME_PROD_USAGE.ASSOCIATIONS.USER,
   });
};
