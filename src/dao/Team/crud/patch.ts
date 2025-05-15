import { ITeam } from '../interface';
import { Team } from '../model';
import { TEAM } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class TeamsPatcher extends EntityPatcher<ITeam> {
   model = Team;
   entityName = TEAM.SINGULAR;
}

export const teamsPatcher = new TeamsPatcher();
