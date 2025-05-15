import { ITeam, ITeamAssociations, ITeamColumnsAliases } from '../interface';
import { Team } from '../model';
import { TEAM } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { teamIncludes } from '../includes';

class TeamsFinder extends EntityFinder<ITeam, ITeamAssociations, ITeamColumnsAliases> {
   model = Team;
   tableName = TEAM.TABLE;
   columns = TEAM.COLUMNS;
   associations = teamIncludes;
}
export const teamsFinder = new TeamsFinder();
