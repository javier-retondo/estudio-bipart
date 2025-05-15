import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IPymeProduct, IPymeProductColumnsAliases } from '../interface';

export class PymeProductWhere extends EntityQueryBuilder<IPymeProduct> {
   columns: (keyof IPymeProduct)[];
   tableName: string;
   where: WhereOptions<IPymeProduct> = [];
   constructor(columns: IPymeProductColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
