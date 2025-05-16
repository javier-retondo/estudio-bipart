import { COMMERCIAL_CLIENT, MODULE, PERMISSION } from '../metadata';
import { CommercialClient, Module, Permission } from '../models';
import { IUserAssociations } from './interface';
import { USER } from './metadata';

export const userIncludes: {
   model: any;
   as: IUserAssociations[keyof IUserAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [
   {
      model: Permission,
      as: USER.ASSOCIATIONS.PERMISSIONS,
      attributes: Object.values(PERMISSION.COLUMNS),
      include: [
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
      ],
   },
];
