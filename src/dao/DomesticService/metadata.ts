import { IMetadata } from '../../utils/interfaces/general';
import { IDomesticServiceAssociations, IDomesticServiceColumnsAliases } from './interface';

export const DOMESTIC_SERVICE: IMetadata<
   IDomesticServiceColumnsAliases,
   IDomesticServiceAssociations
> = {
   TABLE: 'domestic_service',
   COLUMNS: {
      ID: 'id',
      OPERATIVE_CLIENT_ID: 'operative_client_id',
      COUNT: 'count',
      USER_ID: 'user_id',
   },
   PLURAL: 'DomesticServices',
   SINGULAR: 'DomesticService',
   ASSOCIATIONS: {
      USER: 'User',
   },
};
