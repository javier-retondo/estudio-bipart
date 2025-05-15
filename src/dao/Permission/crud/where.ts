import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IPermission, IPermissionColumnsAliases } from '../interface';

export class PermissionWhere extends EntityQueryBuilder<IPermission> {
   columns: (keyof IPermission)[];
   tableName: string;
   where: WhereOptions<IPermission> = [];
   constructor(columns: IPermissionColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
