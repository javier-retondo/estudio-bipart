import { BaseRouter } from '../../../abstractions/baseRouter';
import { ClientController } from './controller';
import {
   CommercialClientIdDTO,
   CreateCommercialClientDTO,
   UpdateCommercialClientDTO,
   CommercialClientsFilterDTO,
} from './dto';
import { ClientMiddleware } from './middleware';

const CLIENT_ROUTES = {
   SINGULAR: '/admin/client',
   PLURAL: '/admin/clients',
};

export class ClientRouter extends BaseRouter<
   ClientController,
   ClientMiddleware,
   typeof CLIENT_ROUTES
> {
   constructor() {
      super(ClientController, ClientMiddleware, CLIENT_ROUTES);
   }

   routes() {
      this.router
         .get(
            this.routesNames.SINGULAR + '/commercial/:Id/clients/operative',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CommercialClientIdDTO, 'params'),
            this.middleware.checkClientId(),
            this.controller.getOperativeClients,
         )
         .get(
            this.routesNames.PLURAL + '/commercial',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CommercialClientsFilterDTO, 'query'),
            this.controller.getCommercialClients,
         )
         .get(
            this.routesNames.SINGULAR + '/commercial/:Id',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CommercialClientIdDTO, 'params'),
            this.middleware.checkClientId(),
            this.controller.getCommercialClient,
         )
         .post(
            this.routesNames.SINGULAR + '/commercial',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CreateCommercialClientDTO, 'body'),
            this.middleware.checkClientFiscalNumber(),
            this.controller.createCommercialClient,
         )
         .put(
            this.routesNames.SINGULAR + '/commercial/:Id',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CommercialClientIdDTO, 'params'),
            this.middleware.validationMiddleware(UpdateCommercialClientDTO, 'body'),
            this.middleware.checkClientId(),
            this.middleware.checkClientFiscalNumber(),
            this.controller.updateCommercialClient,
         )
         .delete(
            this.routesNames.SINGULAR + '/commercial/:Id',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CommercialClientIdDTO, 'params'),
            this.middleware.checkClientId(),
            this.controller.deleteCommercialClient,
         );
   }
}
