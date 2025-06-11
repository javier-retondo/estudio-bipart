import { IMetadata } from '../../utils/interfaces/general';
import { ISocialSecurityAssociations, ISocialSecurityColumnsAliases } from './interface';

export const SOCIAL_SECURITY: IMetadata<
   ISocialSecurityColumnsAliases,
   ISocialSecurityAssociations
> = {
   TABLE: 'social_security',
   COLUMNS: {
      ID: 'id',
      COUNT: 'count',
      USER_ID: 'user_id',
      PYME_PRODUCT_ID: 'pyme_product_usage_id',
   },
   PLURAL: 'SocialSecurities',
   SINGULAR: 'SocialSecurity',
   ASSOCIATIONS: {
      USER: 'User',
   },
};
