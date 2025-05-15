import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IRisk, IRiskColumnsAliases } from '../interface';

export class RiskWhere extends EntityQueryBuilder<IRisk> {
   columns: (keyof IRisk)[];
   tableName: string;
   where: WhereOptions<IRisk> = [];
   constructor(columns: IRiskColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
