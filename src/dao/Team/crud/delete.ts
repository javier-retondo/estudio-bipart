import { Team } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { TEAM } from '../metadata';

class TeamsDeleter extends EntityDeleter {
   model = Team;
   entityName = TEAM.SINGULAR;
}

export const teamsDeleter = new TeamsDeleter();
