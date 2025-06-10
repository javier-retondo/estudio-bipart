import { IUser } from '../interfaces';
import { IGrossIncome } from './interface';
import { GrossIncome } from './model';

class GrossIncomeService {
   async getGrossIncomeById(id: number): Promise<IGrossIncome> {
      const grossIncome = await GrossIncome.findByPk(id).then(
         (grossIncome) => grossIncome?.dataValues,
      );
      if (!grossIncome) {
         throw new Error(`GrossIncome with id ${id} not found`);
      }
      return grossIncome;
   }

   async createGrossIncome(
      grossIncomeData: Omit<IGrossIncome, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
   ): Promise<IGrossIncome> {
      const newGrossIncome = await GrossIncome.create({
         ...grossIncomeData,
         created_at: new Date(),
         updated_at: null,
         deleted_at: null,
      });
      return newGrossIncome.dataValues;
   }

   async getGrossIncomes(): Promise<IGrossIncome[]> {
      const grossIncomes = await GrossIncome.findAll({
         where: { deleted_at: null },
         order: [['created_at', 'DESC']],
      });
      return grossIncomes.map((grossIncome) => grossIncome.dataValues);
   }

   async updateGrossIncome(
      id: number,
      grossIncomeData: Partial<Omit<IGrossIncome, 'id' | 'created_at' | 'deleted_at'>>,
   ): Promise<IGrossIncome> {
      const grossIncome = await GrossIncome.findByPk(id);
      if (!grossIncome) {
         throw new Error(`GrossIncome with id ${id} not found`);
      }
      const updatedGrossIncome = await grossIncome.update({
         ...grossIncomeData,
         updated_at: new Date(),
         updated_by: grossIncomeData.updated_by ?? grossIncome.dataValues.updated_by,
      });
      return updatedGrossIncome.dataValues;
   }

   async deleteGrossIncome(id: number, userData: IUser): Promise<string> {
      const grossIncome = await GrossIncome.findByPk(id);
      if (!grossIncome) {
         throw new Error(`GrossIncome with id ${id} not found`);
      }
      await grossIncome.update({
         deleted_at: new Date(),
         updated_at: new Date(),
         deleted_by: userData.id,
         updated_by: userData.id,
      });

      return `GrossIncome with id ${id} deleted successfully`;
   }
}

export const grossIncomeService = new GrossIncomeService();
