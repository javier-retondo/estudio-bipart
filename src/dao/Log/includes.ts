import { ILogAssociations } from './interface';

export const logIncludes: {
   model: any;
   as: ILogAssociations[keyof ILogAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [];
