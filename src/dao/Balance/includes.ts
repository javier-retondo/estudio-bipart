import { IBalanceAssociations } from './interface';

export const balanceIncludes: {
   model: any;
   as: IBalanceAssociations[keyof IBalanceAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [];
