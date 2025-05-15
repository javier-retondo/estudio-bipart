import { IGrossIncomeAssociations } from './interface';

export const grossIncomeIncludes: {
   model: any;
   as: IGrossIncomeAssociations[keyof IGrossIncomeAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [];
