import { ICommercialClient, IModule, IUser } from '../interfaces';

export type IPermission = {
   id?: number;
   module_id: number;
   user_id: number;
   commercial_client_id: number;
   date_from: Date;
   date_to: Date;
   allow_read: boolean;
   allow_create: boolean;
   allow_update: boolean;
   allow_delete: boolean;

   // Associations
   User?: IUser;
   Module?: IModule;
   CommercialClient?: ICommercialClient;
};

type PermissionColumnAliasKeys =
   | 'ID'
   | 'MODULE_ID'
   | 'USER_ID'
   | 'COMMERCIAL_CLIENT_ID'
   | 'DATE_FROM'
   | 'DATE_TO'
   | 'ALLOW_READ'
   | 'ALLOW_CREATE'
   | 'ALLOW_UPDATE'
   | 'ALLOW_DELETE';
export type IPermissionColumnsAliases = { [key in PermissionColumnAliasKeys]: keyof IPermission };

type PermissionAssociationKeys = 'USER' | 'MODULE' | 'COMMERCIAL_CLIENT';
export type IPermissionAssociations = { [key in PermissionAssociationKeys]: keyof IPermission };
