import { IUser } from '../interfaces';
import { IMonotributist } from './interface';
import { Monotributist } from './model';

class MonotributistService {
   async getMonotributistById(id: number): Promise<IMonotributist> {
      const monotributist = await Monotributist.findByPk(id).then(
         (monotributist) => monotributist?.dataValues,
      );
      if (!monotributist) {
         throw new Error(`Monotributist with id ${id} not found`);
      }
      return monotributist;
   }

   async createMonotributist(
      monotributistData: Omit<IMonotributist, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
   ): Promise<IMonotributist> {
      const newMonotributist = await Monotributist.create({
         ...monotributistData,
         created_at: new Date(),
         updated_at: null,
         deleted_at: null,
      });
      return newMonotributist.dataValues;
   }

   async getMonotributists(): Promise<IMonotributist[]> {
      const monotributists = await Monotributist.findAll({
         where: { deleted_at: null },
         order: [['created_at', 'DESC']],
      });
      return monotributists.map((monotributist) => monotributist.dataValues);
   }

   async updateMonotributist(
      id: number,
      monotributistData: Partial<Omit<IMonotributist, 'id' | 'created_at' | 'deleted_at'>>,
   ): Promise<IMonotributist> {
      const monotributist = await Monotributist.findByPk(id);
      if (!monotributist) {
         throw new Error(`Monotributist with id ${id} not found`);
      }
      const updatedMonotributist = await monotributist.update({
         ...monotributistData,
         updated_at: new Date(),
         updated_by: monotributistData.updated_by ?? monotributist.dataValues.updated_by,
      });
      return updatedMonotributist.dataValues;
   }

   async deleteMonotributist(id: number, userData: IUser): Promise<string> {
      const monotributist = await Monotributist.findByPk(id);
      if (!monotributist) {
         throw new Error(`Monotributist with id ${id} not found`);
      }
      await monotributist.update({
         deleted_at: new Date(),
         updated_at: new Date(),
         deleted_by: userData.id,
         updated_by: userData.id,
      });

      return `Monotributist with id ${id} deleted successfully`;
   }
}

export const monotributistService = new MonotributistService();
