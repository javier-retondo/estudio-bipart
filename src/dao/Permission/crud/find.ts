import { IPermission, IPermissionAssociations, IPermissionColumnsAliases } from '../interface';
import { Permission } from '../model';
import { PERMISSION } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { permissionIncludes } from '../includes';

class PermissionsFinder extends EntityFinder<
   IPermission,
   IPermissionAssociations,
   IPermissionColumnsAliases
> {
   model = Permission;
   tableName = PERMISSION.TABLE;
   columns = PERMISSION.COLUMNS;
   associations = permissionIncludes;
}
export const permissionsFinder = new PermissionsFinder();
