import { BaseRouter } from '../../../abstractions/baseRouter';
import { RouteController } from './controller';
import { SecureRouteDTO } from './dto';
import { RouteMiddleware } from './middleware';

const ROUTE_ROUTES = {
   SINGULAR: '/admin/route',
};

export class RouteRouter extends BaseRouter<RouteController, RouteMiddleware, typeof ROUTE_ROUTES> {
   constructor() {
      super(RouteController, RouteMiddleware, ROUTE_ROUTES);
   }

   routes() {
      this.router.get(
         this.routesNames.SINGULAR + '/:module_id',
         this.middleware.verifyToken,
         this.middleware.validationMiddleware(SecureRouteDTO, 'params'),
         this.controller.getRoute,
      );
   }
}
