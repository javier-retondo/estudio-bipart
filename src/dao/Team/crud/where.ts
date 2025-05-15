import { WhereOptions } from 'sequelize';
import { EntityQueryBuilder } from '../../../abstractions/sequelizeBases/baseWhere';
import { ITeam, ITeamColumnsAliases } from '../interface';

export class TeamWhere extends EntityQueryBuilder<ITeam> {
   columns: (keyof ITeam)[];
   tableName: string;
   where: WhereOptions<ITeam> = [];
   constructor(columns: ITeamColumnsAliases, tableName: string) {
      super();
      this.tableName = tableName;
      this.columns = Object.values(columns);
   }
}
