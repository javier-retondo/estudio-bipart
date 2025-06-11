import { IMetadata } from '../../utils/interfaces/general';
import { IDomesticServiceAssociations, IDomesticServiceColumnsAliases } from './interface';

export const DOMESTIC_SERVICE: IMetadata<
   IDomesticServiceColumnsAliases,
   IDomesticServiceAssociations
> = {
   TABLE: 'domestic_service',
   COLUMNS: {
      ID: 'id',
      COUNT: 'count',
      USER_ID: 'user_id',
      PYME_PRODUCT_ID: 'pyme_product_usage_id',
   },
   PLURAL: 'DomesticServices',
   SINGULAR: 'DomesticService',
   ASSOCIATIONS: {
      USER: 'User',
   },
};
