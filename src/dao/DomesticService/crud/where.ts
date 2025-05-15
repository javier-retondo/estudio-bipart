import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IDomesticService, IDomesticServiceColumnsAliases } from '../interface';

export class DomesticServiceWhere extends EntityQueryBuilder<IDomesticService> {
   columns: (keyof IDomesticService)[];
   tableName: string;
   where: WhereOptions<IDomesticService> = [];
   constructor(columns: IDomesticServiceColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
