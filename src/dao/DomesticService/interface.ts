import { IUser } from '../interfaces';

export type IDomesticService = {
   id?: number;
   count: number;
   user_id: number;
   pyme_product_usage_id: number;
   // Associations
   User?: IUser;
};

type DomesticServiceColumnAliasKeys = 'ID' | 'COUNT' | 'USER_ID' | 'PYME_PRODUCT_ID';
export type IDomesticServiceColumnsAliases = {
   [key in DomesticServiceColumnAliasKeys]: keyof IDomesticService;
};

export type IDomesticServiceAssociationsKeys = 'USER';

export type IDomesticServiceAssociations = {
   [key in IDomesticServiceAssociationsKeys]: keyof IDomesticService;
};
