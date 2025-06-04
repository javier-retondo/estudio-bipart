import { IModule } from './interface';
import { Module } from './model';

class ModuleService {
   async getModules(
      criteria: Partial<{ isAdmin: boolean; modulesIds?: number[] }>,
   ): Promise<IModule[]> {
      const modules = await Module.findAll({
         where: {
            ...(criteria.isAdmin ? {} : { id: criteria.modulesIds }),
         },
         order: [['id', 'ASC']],
      });

      if (modules.length === 0) {
         throw new Error('No active modules found');
      }

      return modules.map((module) => module.dataValues);
   }

   async getAllModules(): Promise<IModule[]> {
      const modules = await Module.findAll({
         order: [['id', 'ASC']],
      });

      if (modules.length === 0) {
         throw new Error('No active modules found');
      }

      return modules.map((module) => module.dataValues);
   }
}

export const moduleService = new ModuleService();
