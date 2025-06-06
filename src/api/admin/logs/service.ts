import { sequelize } from '../../../config';
import { logService } from '../../../dao/Log/service';
import { LogsFilterDTO } from './dto';

class LogServices {
   private async handleTransaction<T>(operation: (transaction: any) => Promise<T>): Promise<T> {
      const transaction = await sequelize.transaction();
      const result = await operation(transaction);
      await transaction.commit();
      return result;
   }

   async getLogs(LogsFilterDTO: LogsFilterDTO) {
      const { page, pageSize, sortBy, sortDesc, type, search, method, userId, startDate, endDate } =
         LogsFilterDTO;

      return logService.findAll(
         {
            page: page ? Number(page) : 1,
            pageSize: pageSize ? Number(pageSize) : 10,
            sortBy: sortBy || 'id',
            sortDesc: sortDesc ? (sortDesc === true ? 'ASC' : 'DESC') : 'DESC',
         },
         search,
         userId,
         type,
         startDate ? new Date(startDate) : undefined,
         endDate ? new Date(endDate) : undefined,
         method,
      );
   }
}

const logServices = new LogServices();
export { logServices };
