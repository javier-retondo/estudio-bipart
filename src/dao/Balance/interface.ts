export type IBalance = {
   id?: number;
   operative_client_id: number;
   team_id: number;
   month_number: number;
};

type BalanceColumnAliasKeys = 'ID' | 'OPERATIVE_CLIENT_ID' | 'TEAM_ID' | 'MONTH_NUMBER';
export type IBalanceColumnsAliases = {
   [key in BalanceColumnAliasKeys]: keyof IBalance;
};

export type IBalanceAssociations = object;
