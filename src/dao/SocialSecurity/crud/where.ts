import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { ISocialSecurity, ISocialSecurityColumnsAliases } from '../interface';

export class SocialSecurityWhere extends EntityQueryBuilder<ISocialSecurity> {
   columns: (keyof ISocialSecurity)[];
   tableName: string;
   where: WhereOptions<ISocialSecurity> = [];
   constructor(columns: ISocialSecurityColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
