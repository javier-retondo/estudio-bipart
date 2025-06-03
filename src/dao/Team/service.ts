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

   async updateTeam(
      id: number,
      teamData: Partial<Omit<ITeam, 'id' | 'created_at' | 'deleted_at'>>,
   ): Promise<ITeam> {
      const team = await Team.findByPk(id);
      if (!team) {
         throw new Error(`Team with id ${id} not found`);
      }
      const updatedTeam = await team.update({
         ...teamData,
         updated_at: new Date(),
         updated_by: teamData.updated_by ?? team.dataValues.updated_by,
      });
      return updatedTeam.dataValues;
   }

   async deleteTeam(id: number): Promise<string> {
      const team = await Team.findByPk(id);
      if (!team) {
         throw new Error(`Team with id ${id} not found`);
      }
      await team.update({
         deleted_at: new Date(),
         updated_at: new Date(),
      });

      return `Team with id ${id} deleted successfully`;
   }
}

export const teamService = new TeamService();
