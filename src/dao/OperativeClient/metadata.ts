import { IMetadata } from '../../utils/interfaces/general';
import { IOperativeClientAssociations, IOperativeClientColumnsAliases } from './interface';

export const OPERATIVE_CLIENT: IMetadata<
   IOperativeClientColumnsAliases,
   IOperativeClientAssociations
> = {
   TABLE: 'operative_client',
   COLUMNS: {
      ID: 'id',
      FISCAL_NAME: 'fiscal_name',
      FISCAL_NUMBER: 'fiscal_number',
      IS_PHYSICAL_PERSON: 'is_physical_person',
      ACTIVITY: 'activity',
      BORN_DATE: 'born_date',
      OBSERVATIONS: 'observations',
      COMMERCIAL_CLIENT_ID: 'commercial_client_id',
      PAYMENT_TYPE_ID: 'payment_type_id',
      IS_COUPON_PROD: 'is_coupon_product',
      IS_INVOICE_PROD: 'is_invoice_product',
      IS_SYSTEM_PROD: 'is_system_product',
      IS_SOCIETY_PROD: 'is_society_product',
      IS_PHYSICAL_PERSON_PROD: 'is_physical_person_product',
      CREATED_AT: 'created_at',
      UPDATED_AT: 'updated_at',
      DELETED_AT: 'deleted_at',
      CREATED_BY: 'created_by',
      UPDATED_BY: 'updated_by',
      DELETED_BY: 'deleted_by',
      SUSPENDED_AT: 'suspended_at',
      SUSPENDED_BY: 'suspended_by',
      SUSPENDED_REASON: 'suspended_reason',
   },
   PLURAL: 'OperativeClients',
   SINGULAR: 'OperativeClient',
   ASSOCIATIONS: {
      COMMERCIAL_CLIENT: 'CommercialClient',
      RISK_PRODUCT: 'RiskProduct',
      PYME_PRODUCT: 'PymeProduct',
      BALANCE_PRODUCT: 'BalanceProduct',
      PAYMENT_TYPE: 'PaymentType',
   },
};
