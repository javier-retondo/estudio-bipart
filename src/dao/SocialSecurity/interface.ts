import { IUser } from '../interfaces';

export type ISocialSecurity = {
   id?: number;
   count: number;
   user_id: number;
   pyme_product_usage_id: number;
   // Associations
   User?: IUser;
};

type SocialSecurityColumnAliasKeys = 'ID' | 'COUNT' | 'USER_ID' | 'PYME_PRODUCT_ID';
export type ISocialSecurityColumnsAliases = {
   [key in SocialSecurityColumnAliasKeys]: keyof ISocialSecurity;
};

export type ISocialSecurityAssociationsKeys = 'USER';

export type ISocialSecurityAssociations = {
   [key in ISocialSecurityAssociationsKeys]: keyof ISocialSecurity;
};
