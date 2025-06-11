import { ITeam } from '../interfaces';

export type IBalance = {
   id?: number;
   team_id: number;
   month_number: number;
   operative_client_id: number;

   // Associations
   Team?: ITeam;
};

type BalanceColumnAliasKeys = 'ID' | 'TEAM_ID' | 'MONTH_NUMBER' | 'OPERATIVE_CLIENT_ID';
export type IBalanceColumnsAliases = {
   [key in BalanceColumnAliasKeys]: keyof IBalance;
};

type BalanceAssociationsKeys = 'TEAM';

export type IBalanceAssociations = {
   [key in BalanceAssociationsKeys]: keyof IBalance;
};
