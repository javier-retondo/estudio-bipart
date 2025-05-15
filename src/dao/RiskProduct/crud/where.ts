import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IRiskProduct, IRiskProductColumnsAliases } from '../interface';

export class RiskWhere extends EntityQueryBuilder<IRiskProduct> {
   columns: (keyof IRiskProduct)[];
   tableName: string;
   where: WhereOptions<IRiskProduct> = [];
   constructor(columns: IRiskProductColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
