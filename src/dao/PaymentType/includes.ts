import { IPaymentTypeAssociations } from './interface';

export const paymenttypeIncludes: {
   model: any;
   as: IPaymentTypeAssociations[keyof IPaymentTypeAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [];
