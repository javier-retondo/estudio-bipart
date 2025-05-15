import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IPymeProdUsage, IPymeProdUsageColumnsAliases } from '../interface';

export class PymeProdUsageWhere extends EntityQueryBuilder<IPymeProdUsage> {
   columns: (keyof IPymeProdUsage)[];
   tableName: string;
   where: WhereOptions<IPymeProdUsage> = [];
   constructor(columns: IPymeProdUsageColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
