import { IMetadata } from '../../utils/interfaces/general';
import { IPymeProductAssociations, IPymeProductColumnsAliases } from './interface';

export const PYME_PRODUCT: IMetadata<IPymeProductColumnsAliases, IPymeProductAssociations> = {
   TABLE: 'pyme_product',
   COLUMNS: {
      ID: 'id',
      NAME: 'pyme_prod_name',
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
   PLURAL: 'PymeProducts',
   SINGULAR: 'PymeProduct',
   ASSOCIATIONS: {},
};
