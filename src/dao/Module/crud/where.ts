import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IModule, IModuleColumnsAliases } from '../interface';

export class ModuleWhere extends EntityQueryBuilder<IModule> {
   columns: (keyof IModule)[];
   tableName: string;
   where: WhereOptions<IModule> = [];
   constructor(columns: IModuleColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
