export type IPymeProdUsage = {
   id?: number;
   operative_client_id: number;
   pyme_product_id: number;
   team_id: number;
   division_id: number;
   gross_income_id: number;
   monotributist_id: number;
   user_id: number;
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

export type IPymeProdUsageAssociations = object;
