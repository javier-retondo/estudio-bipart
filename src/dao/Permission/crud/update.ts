import { IPermission } from '../interface';
import { Permission } from '../model';
import { PERMISSION } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class PermissionsUpdater extends EntityUpdater<IPermission> {
   model = Permission;
   entityName = PERMISSION.SINGULAR;
}

export const permissionsUpdater = new PermissionsUpdater();
