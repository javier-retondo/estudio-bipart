import { DB_RESTRICTIONS } from '../../utils/constants/DB_RESTRICIONS';
import { BALANCE, COMMERCIAL_CLIENT, PYME_PROD_USAGE, RISK_PRODUCT } from '../metadata';
import { Balance, CommercialClient, PaymentType, PymeProdUsage, RiskProduct } from '../models';
import { PAYMENT_TYPE } from '../PaymentType/metadata';
import { OPERATIVE_CLIENT } from './metadata';
import { OperativeClient } from './model';

export const initOperativeClientAssociations = () => {
   console.log('   🔄OperativeClient Associations is starting...');

   OperativeClient.belongsTo(CommercialClient, {
      foreignKey: OPERATIVE_CLIENT.COLUMNS.COMMERCIAL_CLIENT_ID,
      targetKey: COMMERCIAL_CLIENT.COLUMNS.ID,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.COMMERCIAL_CLIENT,
   });

   OperativeClient.hasOne(Balance, {
      foreignKey: BALANCE.COLUMNS.OPERATIVE_CLIENT_ID,
      sourceKey: OPERATIVE_CLIENT.COLUMNS.ID,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.BALANCE_PRODUCT,
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

   OperativeClient.belongsTo(PaymentType, {
      foreignKey: OPERATIVE_CLIENT.COLUMNS.PAYMENT_TYPE_ID,
      targetKey: PAYMENT_TYPE.COLUMNS.ID,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.PAYMENT_TYPE,
      onDelete: DB_RESTRICTIONS.RESTRICT,
      onUpdate: DB_RESTRICTIONS.CASCADE,
   });
};
