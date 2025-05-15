import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IBalance, IBalanceColumnsAliases } from '../interface';

export class BalanceWhere extends EntityQueryBuilder<IBalance> {
   columns: (keyof IBalance)[];
   tableName: string;
   where: WhereOptions<IBalance> = [];
   constructor(columns: IBalanceColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
