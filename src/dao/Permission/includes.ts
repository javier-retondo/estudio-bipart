import { COMMERCIAL_CLIENT, MODULE, USER } from '../metadata';
import { CommercialClient, Module, User } from '../models';
import { IPermissionAssociations } from './interface';
import { PERMISSION } from './metadata';

export const permissionIncludes: {
   model: any;
   as: IPermissionAssociations[keyof IPermissionAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [
   {
      model: User,
      as: PERMISSION.ASSOCIATIONS.USER,
      attributes: [USER.COLUMNS.ID, USER.COLUMNS.FIRSTNAME, USER.COLUMNS.LASTNAME],
   },
   {
      model: Module,
      as: PERMISSION.ASSOCIATIONS.MODULE,
      attributes: [MODULE.COLUMNS.ID, MODULE.COLUMNS.MODULE_NAME],
   },
   {
      model: CommercialClient,
      as: PERMISSION.ASSOCIATIONS.COMMERCIAL_CLIENT,
      attributes: [
         COMMERCIAL_CLIENT.COLUMNS.ID,
         COMMERCIAL_CLIENT.COLUMNS.FISCAL_NAME,
         COMMERCIAL_CLIENT.COLUMNS.FISCAL_NUMBER,
      ],
   },
];
