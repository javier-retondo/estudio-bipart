import { IUser } from '../interfaces';
import { IDivision } from './interface';
import { Division } from './model';

class DivisionService {
   async getDivisionById(id: number): Promise<IDivision> {
      const division = await Division.findByPk(id).then((division) => division?.dataValues);
      if (!division) {
         throw new Error(`Division with id ${id} not found`);
      }
      return division;
   }

   async createDivision(
      divisionData: Omit<IDivision, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
   ): Promise<IDivision> {
      const newDivision = await Division.create({
         ...divisionData,
         created_at: new Date(),
         updated_at: null,
         deleted_at: null,
      });
      return newDivision.dataValues;
   }

   async getDivisions(): Promise<IDivision[]> {
      const divisions = await Division.findAll({
         where: { deleted_at: null },
         order: [['created_at', 'DESC']],
      });
      return divisions.map((division) => division.dataValues);
   }

   async updateDivision(
      id: number,
      divisionData: Partial<Omit<IDivision, 'id' | 'created_at' | 'deleted_at'>>,
   ): Promise<IDivision> {
      const division = await Division.findByPk(id);
      if (!division) {
         throw new Error(`Division with id ${id} not found`);
      }
      const updatedDivision = await division.update({
         ...divisionData,
         updated_at: new Date(),
         updated_by: divisionData.updated_by ?? division.dataValues.updated_by,
      });
      return updatedDivision.dataValues;
   }

   async deleteDivision(id: number, userData: IUser): Promise<string> {
      const division = await Division.findByPk(id);
      if (!division) {
         throw new Error(`Division with id ${id} not found`);
      }
      await division.update({
         deleted_at: new Date(),
         updated_at: new Date(),
         deleted_by: userData.id,
         updated_by: userData.id,
      });

      return `Division with id ${id} deleted successfully`;
   }
}

export const divisionService = new DivisionService();
