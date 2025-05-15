import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { ILog, ILogColumnsAliases } from '../interface';

export class LogWhere extends EntityQueryBuilder<ILog> {
   columns: (keyof ILog)[];
   tableName: string;
   where: WhereOptions<ILog> = [];
   constructor(columns: ILogColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
