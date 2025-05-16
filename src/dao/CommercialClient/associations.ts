import { DB_RESTRICTIONS } from '../../utils/constants/DB_RESTRICIONS';
import { OPERATIVE_CLIENT, VAT_CONDITION } from '../metadata';
import { OperativeClient, VatCondition } from '../models';
import { COMMERCIAL_CLIENT } from './metadata';
import { CommercialClient } from './model';

export const initCommercialClientAssociations = () => {
   console.log('🚀 CommercialClient Associations is starting...');
   CommercialClient.hasMany(OperativeClient, {
      sourceKey: COMMERCIAL_CLIENT.COLUMNS.ID,
      foreignKey: OPERATIVE_CLIENT.COLUMNS.COMMERCIAL_CLIENT_ID,
      as: COMMERCIAL_CLIENT.ASSOCIATIONS.OPERATIVE_CLIENT,
      onDelete: DB_RESTRICTIONS.CASCADE,
      onUpdate: DB_RESTRICTIONS.CASCADE,
   });

   CommercialClient.belongsTo(VatCondition, {
      foreignKey: COMMERCIAL_CLIENT.COLUMNS.VAT_CONDITION_ID,
      targetKey: VAT_CONDITION.COLUMNS.ID,
      as: COMMERCIAL_CLIENT.ASSOCIATIONS.VAT_CONDITION,
   });
};
