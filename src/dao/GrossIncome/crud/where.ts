import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IGrossIncome, IGrossIncomeColumnsAliases } from '../interface';

export class GrossIncomeWhere extends EntityQueryBuilder<IGrossIncome> {
   columns: (keyof IGrossIncome)[];
   tableName: string;
   where: WhereOptions<IGrossIncome> = [];
   constructor(columns: IGrossIncomeColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
