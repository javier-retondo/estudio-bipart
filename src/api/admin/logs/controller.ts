import { Request, Response } from 'express';
import { LogsFilterDTO } from './dto';
import { logServices } from './service';
import { success, error } from '../../../utils/network/responses';
import { PAGE_LIMIT } from '../../../abstractions/sequelizeBases/baseFind';

export class LogController {
   async getLogs(req: Request, res: Response): Promise<void> {
      const filter: LogsFilterDTO = JSON.parse(JSON.stringify(req.query));
      const { page, pageSize, sortBy, sortDesc, type, search, method, userId, startDate, endDate } =
         filter;

      await logServices
         .getLogs({
            page,
            pageSize,
            sortBy,
            sortDesc,
            type,
            search,
            method,
            userId,
            startDate,
            endDate,
         })
         .then((body) => {
            let pagination = {
               page: 1,
               limit: body.count < PAGE_LIMIT ? body.count : PAGE_LIMIT,
               total: body.count,
            };
            if (page && pageSize) {
               pagination = {
                  page: Number(page),
                  limit: Number(pageSize),
                  total: body.count,
               };
            }
            success({ req, res, body: body.rows, pagination });
         })
         .catch((err) => error({ req, res, body: err }));
   }
}
