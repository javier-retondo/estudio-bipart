import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IMonotributist, IMonotributistColumnsAliases } from '../interface';

export class MonotributistWhere extends EntityQueryBuilder<IMonotributist> {
   columns: (keyof IMonotributist)[];
   tableName: string;
   where: WhereOptions<IMonotributist> = [];
   constructor(columns: IMonotributistColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
