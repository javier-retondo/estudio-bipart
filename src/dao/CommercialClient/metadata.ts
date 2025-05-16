import { IMetadata } from '../../utils/interfaces/general';
import { ICommercialClientAssociations, ICommercialClientColumnsAliases } from './interface';

export const COMMERCIAL_CLIENT: IMetadata<
   ICommercialClientColumnsAliases,
   ICommercialClientAssociations
> = {
   TABLE: 'commercial_client',
   COLUMNS: {
      ID: 'id',
      FISCAL_NAME: 'fiscal_name',
      FISCAL_NUMBER: 'fiscal_number',
      PERSON_TYPE_ID: 'person_type_id',
      VAT_CONDITION_ID: 'vat_condition_id',
      EMAIL: 'email',
      PHONE: 'phone',
      PROVINCE: 'province',
      CITY: 'city',
      ADDRESS: 'address',
      OBSERVATIONS: 'observations',
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
   PLURAL: 'CommercialClients',
   SINGULAR: 'CommercialClient',
   ASSOCIATIONS: {},
};
