import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IVatCondition, IVatConditionColumnsAliases } from '../interface';

export class VatConditionWhere extends EntityQueryBuilder<IVatCondition> {
   columns: (keyof IVatCondition)[];
   tableName: string;
   where: WhereOptions<IVatCondition> = [];
   constructor(columns: IVatConditionColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
