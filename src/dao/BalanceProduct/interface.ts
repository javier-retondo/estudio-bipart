import { ITeam } from '../interfaces';

export type IBalance = {
   id?: number;
   team_id: number;
   month_number: number;

   // Associations
   Team?: ITeam;
};

type BalanceColumnAliasKeys = 'ID' | 'TEAM_ID' | 'MONTH_NUMBER';
export type IBalanceColumnsAliases = {
   [key in BalanceColumnAliasKeys]: keyof IBalance;
};

type BalanceAssociationsKeys = 'TEAM';

export type IBalanceAssociations = {
   [key in BalanceAssociationsKeys]: keyof IBalance;
};
