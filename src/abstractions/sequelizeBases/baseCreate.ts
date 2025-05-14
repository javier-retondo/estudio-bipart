import { Transaction } from 'sequelize';

export abstract class EntityCreator<T> {
   abstract model: any;
   abstract entityName: string;

   async createEntities(entities: T[], transaction?: Transaction): Promise<T[]> {
      if (entities.length > 0) {
         return await this.model
            .bulkCreate(entities, { transaction })
            .then((data: any) => {
               return data.map((item: any) => item.get());
            })
            .catch(async (error: any) => {
               const errorLog = {
                  tableName: this.entityName,
                  message: error.message || 'Error desconocido',
                  sql: error?.sql || 'No disponible',
                  parameters: JSON.stringify(error?.parameters || {}),
                  stack: error.stack,
               };

               if (transaction) await transaction.rollback();
               throw errorLog;
            });
      } else {
         return await this.model
            .create(entities[0], { transaction })
            .then((data: any) => {
               return [data.get()];
            })
            .catch(async (error: any) => {
               const errorLog = {
                  tableName: this.entityName,
                  message: error.message || 'Error desconocido',
                  sql: error?.sql || 'No disponible',
                  parameters: JSON.stringify(error?.parameters || {}),
                  stack: error.stack,
               };

               if (transaction) await transaction.rollback();
               throw errorLog;
            });
      }
   }
}
