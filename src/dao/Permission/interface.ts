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

export type IPermissionAssociations = object;
