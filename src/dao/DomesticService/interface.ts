import { IUser } from '../interfaces';

export type IDomesticService = {
   id?: number;
   operative_client_id: number;
   count: number;
   user_id: number;

   // Associations
   User?: IUser;
};

type DomesticServiceColumnAliasKeys = 'ID' | 'OPERATIVE_CLIENT_ID' | 'COUNT' | 'USER_ID';
export type IDomesticServiceColumnsAliases = {
   [key in DomesticServiceColumnAliasKeys]: keyof IDomesticService;
};

export type IDomesticServiceAssociationsKeys = 'USER';

export type IDomesticServiceAssociations = {
   [key in IDomesticServiceAssociationsKeys]: keyof IDomesticService;
};
