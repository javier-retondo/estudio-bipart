import { IMetadata } from '../../utils/interfaces/general';
import { IPaymentTypeAssociations, IPaymentTypeColumnsAliases } from './interface';

export const PAYMENT_TYPE: IMetadata<IPaymentTypeColumnsAliases, IPaymentTypeAssociations> = {
   TABLE: 'payment_type',
   COLUMNS: {
      ID: 'id',
      NAME: 'name',
      DESCRIPTION: 'description',
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
   PLURAL: 'PaymentTypes',
   SINGULAR: 'PaymentType',
   ASSOCIATIONS: {},
};
