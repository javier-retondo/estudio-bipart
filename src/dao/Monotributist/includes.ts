import { IMonotributistAssociations } from './interface';

export const monotributistIncludes: {
   model: any;
   as: IMonotributistAssociations[keyof IMonotributistAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [];
