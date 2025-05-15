import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { IDigitalCert, IDigitalCertColumnsAliases } from '../interface';

export class DigitalCertWhere extends EntityQueryBuilder<IDigitalCert> {
   columns: (keyof IDigitalCert)[];
   tableName: string;
   where: WhereOptions<IDigitalCert> = [];
   constructor(columns: IDigitalCertColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
