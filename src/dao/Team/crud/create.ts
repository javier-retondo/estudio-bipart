import { ITeam } from '../interface';
import { Team } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { TEAM } from '../metadata';

class TeamsCreator extends EntityCreator<ITeam> {
   model = Team;
   entityName = TEAM.SINGULAR;
}

export const teamsCreator = new TeamsCreator();
