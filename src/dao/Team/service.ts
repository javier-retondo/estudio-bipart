import { ITeam } from './interface';
import { Team } from './model';

class TeamService {
   async getTeamById(id: number): Promise<ITeam> {
      const team = await Team.findByPk(id).then((team) => team?.dataValues);
      if (!team) {
         throw new Error(`Team with id ${id} not found`);
      }
      return team;
   }

   async createTeam(
      teamData: Omit<ITeam, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
   ): Promise<ITeam> {
      const newTeam = await Team.create({
         ...teamData,
         created_at: new Date(),
         updated_at: null,
         deleted_at: null,
      });
      return newTeam.dataValues;
   }

   async getTeams(): Promise<ITeam[]> {
      const teams = await Team.findAll({
         where: { deleted_at: null },
         order: [['created_at', 'DESC']],
      });
      return teams.map((team) => team.dataValues);
   }
}

export const teamService = new TeamService();
