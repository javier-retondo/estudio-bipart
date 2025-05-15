import { IMetadata } from '../../utils/interfaces/general';
import { IPermissionAssociations, IPermissionColumnsAliases } from './interface';

export const PERMISSION: IMetadata<IPermissionColumnsAliases, IPermissionAssociations> = {
   TABLE: 'permission',
   COLUMNS: {
      ID: 'id',
      MODULE_ID: 'module_id',
      USER_ID: 'user_id',
      COMMERCIAL_CLIENT_ID: 'commercial_client_id',
      DATE_FROM: 'date_from',
      DATE_TO: 'date_to',
      ALLOW_READ: 'allow_read',
      ALLOW_CREATE: 'allow_create',
      ALLOW_UPDATE: 'allow_update',
      ALLOW_DELETE: 'allow_delete',
   },
   PLURAL: 'Permissions',
   SINGULAR: 'Permission',
   ASSOCIATIONS: {},
};
