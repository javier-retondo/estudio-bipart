import { Transaction, WhereOptions } from 'sequelize';

export abstract class EntityUpdater<T> {
   abstract model: any;
   abstract entityName: string;

   async updateEntities(
      entity: Partial<T>,
      where: WhereOptions<T>,
      transaction?: Transaction,
   ): Promise<T[]> {
      return this.model
         .update(entity, { where, transaction })
         .then(() => {
            return this.model.findAll({ where, transaction });
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
