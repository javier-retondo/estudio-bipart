import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IOperativeClient, IOperativeClientColumnsAliases } from '../interface';

export class OperativeClientWhere extends EntityQueryBuilder<IOperativeClient> {
   columns: (keyof IOperativeClient)[];
   tableName: string;
   where: WhereOptions<IOperativeClient> = [];
   constructor(columns: IOperativeClientColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
