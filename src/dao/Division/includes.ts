import { IDivisionAssociations } from './interface';

export const divisionIncludes: {
   model: any;
   as: IDivisionAssociations[keyof IDivisionAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [];
