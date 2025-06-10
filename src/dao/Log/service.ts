import { Log } from './model';
import { ILog, LOG_TYPES } from './interface';
import { User } from '../models';
import { LOG } from './metadata';
import { USER } from '../metadata';
import { col, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import moment from 'moment';

class LogService {
   async create(log: ILog): Promise<ILog> {
      const newLog = await Log.create(log);
      if (!newLog || !newLog.dataValues || !newLog.dataValues.id) {
         throw new Error('Failed to create log entry');
      }
      return this.findById(newLog.dataValues.id);
   }

   async findAll(
      {
         page = 1,
         pageSize = 10,
         sortBy = 'id',
         sortDesc = 'DESC',
      }: {
         page?: number;
         pageSize?: number;
         sortBy?: string;
         sortDesc?: 'ASC' | 'DESC';
      },
      search?: string,
      userId?: number[],
      type?: LOG_TYPES[],
      startDate?: Date,
      endDate?: Date,
      method?: string[],
   ): Promise<{
      count: number;
      rows: ILog[];
   }> {
      const where: WhereOptions<ILog> = [];
      if (search) {
         where.push({
            [Op.or]: [
               { description: { [Op.like]: `%${search}%` } },
               { type: { [Op.like]: `%${search}%` } },
               { endpoint: { [Op.like]: `%${search}%` } },
            ],
         });
      }
      if (userId) {
         where.push({ user_id: { [Op.in]: userId } });
      }
      if (type) {
         where.push({ type: { [Op.in]: type } });
      }
      if (startDate) {
         where.push({ date_time: { [Op.gte]: startDate } });
      }
      if (endDate) {
         where.push({ date_time: { [Op.lte]: endDate } });
      }
      if (method) {
         where.push({ method: { [Op.in]: method } });
      }

      const logs = await Log.findAndCountAll({
         where,
         limit: pageSize,
         offset: (page - 1) * pageSize,
         order: [[col(sortBy), sortDesc]],
         include: [
            {
               model: User,
               as: LOG.ASSOCIATIONS.USER,
               attributes: [USER.COLUMNS.ID, USER.COLUMNS.FIRSTNAME, USER.COLUMNS.LASTNAME],
            },
         ],
      });
      return {
         count: logs.count,
         rows: logs.rows.map((log) => {
            const user = log.dataValues.User;
            return {
               ...log.dataValues,
               date_time: moment(log.dataValues.date_time as Date).format('DD/MM/YYYY HH:mm:ss'),
               firstname: user && user.firstname,
               lastname: user && user.lastname,
               user: `${user ? user.firstname : ''} ${user ? user.lastname : ''}`,
            };
         }),
      };
   }

   async findById(id: number): Promise<ILog> {
      return await Log.findByPk(id, {
         include: [
            {
               model: User,
               as: LOG.ASSOCIATIONS.USER,
               attributes: [USER.COLUMNS.ID, USER.COLUMNS.FIRSTNAME, USER.COLUMNS.LASTNAME],
            },
         ],
      }).then((log) => {
         if (!log) {
            throw new Error(`Log with ID ${id} not found`);
         }
         return log.dataValues;
      });
   }
}

export const logService = new LogService();
