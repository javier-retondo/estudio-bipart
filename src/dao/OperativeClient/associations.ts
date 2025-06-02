import { DB_RESTRICTIONS } from '../../utils/constants/DB_RESTRICIONS';
import {
   BALANCE,
   COMMERCIAL_CLIENT,
   DOMESTIC_SERVICE,
   PYME_PROD_USAGE,
   RISK_PRODUCT,
   SOCIAL_SECURITY,
} from '../metadata';
import {
   Balance,
   CommercialClient,
   DomesticService,
   PymeProdUsage,
   RiskProduct,
   SocialSecurity,
} from '../models';
import { OPERATIVE_CLIENT } from './metadata';
import { OperativeClient } from './model';

export const initOperativeClientAssociations = () => {
   console.log('   🔄OperativeClient Associations is starting...');

   OperativeClient.belongsTo(CommercialClient, {
      foreignKey: OPERATIVE_CLIENT.COLUMNS.COMMERCIAL_CLIENT_ID,
      targetKey: COMMERCIAL_CLIENT.COLUMNS.ID,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.COMMERCIAL_CLIENT,
   });

   OperativeClient.hasOne(DomesticService, {
      foreignKey: DOMESTIC_SERVICE.COLUMNS.OPERATIVE_CLIENT_ID,
      sourceKey: OPERATIVE_CLIENT.COLUMNS.ID,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.DOMESTIC_SERVICE,
      onDelete: DB_RESTRICTIONS.CASCADE,
      onUpdate: DB_RESTRICTIONS.CASCADE,
   });

   OperativeClient.hasOne(SocialSecurity, {
      foreignKey: SOCIAL_SECURITY.COLUMNS.OPERATIVE_CLIENT_ID,
      sourceKey: OPERATIVE_CLIENT.COLUMNS.ID,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.SOCIAL_SECURITY,
      onDelete: DB_RESTRICTIONS.CASCADE,
      onUpdate: DB_RESTRICTIONS.CASCADE,
   });

   OperativeClient.hasOne(PymeProdUsage, {
      foreignKey: PYME_PROD_USAGE.COLUMNS.OPERATIVE_CLIENT_ID,
      sourceKey: OPERATIVE_CLIENT.COLUMNS.ID,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.PYME_PRODUCT,
      onDelete: DB_RESTRICTIONS.CASCADE,
      onUpdate: DB_RESTRICTIONS.CASCADE,
   });

   OperativeClient.hasOne(RiskProduct, {
      foreignKey: RISK_PRODUCT.COLUMNS.OPERATIVE_CLIENT_ID,
      sourceKey: OPERATIVE_CLIENT.COLUMNS.ID,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.RISK_PRODUCT,
      onDelete: DB_RESTRICTIONS.CASCADE,
      onUpdate: DB_RESTRICTIONS.CASCADE,
   });

   OperativeClient.hasOne(Balance, {
      foreignKey: BALANCE.COLUMNS.OPERATIVE_CLIENT_ID,
      sourceKey: OPERATIVE_CLIENT.COLUMNS.ID,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.BALANCE,
      onDelete: DB_RESTRICTIONS.CASCADE,
      onUpdate: DB_RESTRICTIONS.CASCADE,
   });
};
