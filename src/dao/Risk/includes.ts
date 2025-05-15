import { IRiskAssociations } from './interface';

export const riskIncludes: {
   model: any;
   as: IRiskAssociations[keyof IRiskAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [];
