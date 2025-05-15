import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { ICommercialClient, ICommercialClientColumnsAliases } from '../interface';

export class CommercialClientWhere extends EntityQueryBuilder<ICommercialClient> {
   columns: (keyof ICommercialClient)[];
   tableName: string;
   where: WhereOptions<ICommercialClient> = [];
   constructor(columns: ICommercialClientColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
