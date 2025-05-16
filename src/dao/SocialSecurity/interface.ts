import { IUser } from '../interfaces';

export type ISocialSecurity = {
   id?: number;
   operative_client_id: number;
   count: number;
   user_id: number;

   // Associations
   User?: IUser;
};

type SocialSecurityColumnAliasKeys = 'ID' | 'OPERATIVE_CLIENT_ID' | 'COUNT' | 'USER_ID';
export type ISocialSecurityColumnsAliases = {
   [key in SocialSecurityColumnAliasKeys]: keyof ISocialSecurity;
};

export type ISocialSecurityAssociationsKeys = 'USER';

export type ISocialSecurityAssociations = {
   [key in ISocialSecurityAssociationsKeys]: keyof ISocialSecurity;
};
