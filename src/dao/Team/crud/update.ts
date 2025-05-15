import { ITeam } from '../interface';
import { Team } from '../model';
import { TEAM } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class TeamsUpdater extends EntityUpdater<ITeam> {
   model = Team;
   entityName = TEAM.SINGULAR;
}

export const teamsUpdater = new TeamsUpdater();
