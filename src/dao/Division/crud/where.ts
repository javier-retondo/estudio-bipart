import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IDivision, IDivisionColumnsAliases } from '../interface';

export class DivisionWhere extends EntityQueryBuilder<IDivision> {
   columns: (keyof IDivision)[];
   tableName: string;
   where: WhereOptions<IDivision> = [];
   constructor(columns: IDivisionColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
