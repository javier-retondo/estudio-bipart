import { IPermission } from '../interface';
import { Permission } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { PERMISSION } from '../metadata';

class PermissionsCreator extends EntityCreator<IPermission> {
   model = Permission;
   entityName = PERMISSION.SINGULAR;
}

export const permissionsCreator = new PermissionsCreator();
