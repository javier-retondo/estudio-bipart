import { BaseRouter } from '../../../abstractions/baseRouter';
import { LogController } from './controller';
import { LogsFilterDTO } from './dto';
import { LogMiddleware } from './middleware';

const LOG_ROUTES = {
   SINGULAR: '/admin/log',
   PLURAL: '/admin/logs',
};

export class LogRouter extends BaseRouter<LogController, LogMiddleware, typeof LOG_ROUTES> {
   constructor() {
      super(LogController, LogMiddleware, LOG_ROUTES);
   }

   routes() {
      this.router.get(
         this.routesNames.PLURAL,
         this.middleware.verifyToken,
         this.middleware.validationMiddleware(LogsFilterDTO, 'query'),
         this.controller.getLogs,
      );
   }
}
