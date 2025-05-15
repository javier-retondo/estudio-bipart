import { Permission } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { PERMISSION } from '../metadata';

class PermissionsDeleter extends EntityDeleter {
   model = Permission;
   entityName = PERMISSION.SINGULAR;
}

export const permissionsDeleter = new PermissionsDeleter();
