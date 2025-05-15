import { IPermission } from '../interface';
import { Permission } from '../model';
import { PERMISSION } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class PermissionsPatcher extends EntityPatcher<IPermission> {
   model = Permission;
   entityName = PERMISSION.SINGULAR;
}

export const permissionsPatcher = new PermissionsPatcher();
