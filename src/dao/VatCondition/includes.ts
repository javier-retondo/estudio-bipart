import { IVatConditionAssociations } from './interface';

export const vatConditionIncludes: {
   model: any;
   as: IVatConditionAssociations[keyof IVatConditionAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [];
