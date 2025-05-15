import { IPermissionAssociations } from './interface';

export const permissionIncludes: {
   model: any;
   as: IPermissionAssociations[keyof IPermissionAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [];
