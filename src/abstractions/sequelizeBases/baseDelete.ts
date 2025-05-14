import { Transaction, WhereOptions } from 'sequelize';

export abstract class EntityDeleter {
   abstract model: any;
   abstract entityName: string;

   async deleteEntities(where: WhereOptions, transaction?: Transaction): Promise<void> {
      return await this.model
         .destroy({ where, transaction })
         .then((deletedCount: number) => {
            console.log(
               `Se eliminaron ${deletedCount} entidades de la tabla ${this.entityName} con los filtros aplicados`,
            );
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
