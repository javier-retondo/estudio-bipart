import { IModuleAssociations } from './interface';

export const moduleIncludes: {
   model: any;
   as: IModuleAssociations[keyof IModuleAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [];
