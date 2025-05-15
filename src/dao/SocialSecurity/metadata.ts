import { IMetadata } from '../../utils/interfaces/general';
import { ISocialSecurityAssociations, ISocialSecurityColumnsAliases } from './interface';

export const SOCIAL_SECURITY: IMetadata<
   ISocialSecurityColumnsAliases,
   ISocialSecurityAssociations
> = {
   TABLE: 'social_security',
   COLUMNS: {
      ID: 'id',
      OPERATIVE_CLIENT_ID: 'operative_client_id',
      COUNT: 'count',
      USER_ID: 'user_id',
   },
   PLURAL: 'SocialSecurities',
   SINGULAR: 'SocialSecurity',
   ASSOCIATIONS: {},
};
