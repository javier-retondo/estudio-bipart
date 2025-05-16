import { IDivision, IGrossIncome, IMonotributist, IPymeProduct, ITeam, IUser } from '../interfaces';

export type IPymeProdUsage = {
   id?: number;
   operative_client_id: number;
   pyme_product_id: number;
   team_id: number;
   division_id: number;
   gross_income_id: number;
   monotributist_id: number;
   user_id: number;

   // Associations
   User?: IUser;
   PymeProduct?: IPymeProduct;
   Team?: ITeam;
   Division?: IDivision;
   GrossIncome?: IGrossIncome;
   Monotributist?: IMonotributist;
};

type PymeProdUsageColumnAliasKeys =
   | 'ID'
   | 'OPERATIVE_CLIENT_ID'
   | 'PYME_PRODUCT_ID'
   | 'TEAM_ID'
   | 'DIVISION_ID'
   | 'GROSS_INCOME_ID'
   | 'MONOTRIBUTIST_ID'
   | 'USER_ID';
export type IPymeProdUsageColumnsAliases = {
   [key in PymeProdUsageColumnAliasKeys]: keyof IPymeProdUsage;
};

type PymeProdUsageAssociationsKeys =
   | 'USER'
   | 'PYME_PRODUCT'
   | 'TEAM'
   | 'DIVISION'
   | 'GROSS_INCOME'
   | 'MONOTRIBUTIST';

export type IPymeProdUsageAssociations = {
   [key in PymeProdUsageAssociationsKeys]: keyof IPymeProdUsage;
};
