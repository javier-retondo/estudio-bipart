import { Team } from '../models';
import { IBalanceAssociations } from './interface';
import { BALANCE } from './metadata';

export const balanceIncludes: {
   model: any;
   as: IBalanceAssociations[keyof IBalanceAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [
   {
      model: Team,
      as: BALANCE.ASSOCIATIONS.TEAM,
      attributes: Object.values(BALANCE.COLUMNS),
   },
];
