import { BaseRouter } from '../../../abstractions/baseRouter';
import { ClientController } from './controller';
import {
   CreateCommercialClientDTO,
   UpdateCommercialClientDTO,
   CommercialClientsFilterDTO,
   SuspendCommercialClientDTO,
   CreateTeamDTO,
   CreatePaymentTypeDTO,
   CreatePymeProductDTO,
   CreateDivisionDTO,
   CreateGrossIncomeDTO,
   CreateMonotributistaDTO,
   CreateOperativeClientDTO,
   ClientIdDTO,
   OperativeClientsFilterDTO,
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
         // Commercial Clients Routes
         .get(
            this.routesNames.SINGULAR + '/commercial/:Id/clients/operative',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(ClientIdDTO, 'params'),
            this.middleware.validationMiddleware(OperativeClientsFilterDTO, 'query'),
            this.middleware.checkClientId('commercial'),
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
            this.middleware.validationMiddleware(ClientIdDTO, 'params'),
            this.middleware.checkClientId('commercial'),
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
            this.middleware.validationMiddleware(ClientIdDTO, 'params'),
            this.middleware.validationMiddleware(UpdateCommercialClientDTO, 'body'),
            this.middleware.checkClientId('commercial'),
            this.middleware.checkClientFiscalNumber(),
            this.controller.updateCommercialClient,
         )
         .put(
            this.routesNames.SINGULAR + '/commercial/:Id/suspend',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(ClientIdDTO, 'params'),
            this.middleware.validationMiddleware(SuspendCommercialClientDTO, 'body'),
            this.middleware.checkClientId('commercial'),
            this.controller.suspendUnsuspendCommercialClient,
         )
         .delete(
            this.routesNames.SINGULAR + '/commercial/:Id',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(ClientIdDTO, 'params'),
            this.middleware.checkClientId('commercial'),
            this.controller.deleteCommercialClient,
         )

         // Operative Clients Routes
         .get(
            this.routesNames.SINGULAR + '/operative/payment-types',
            this.middleware.verifyToken,
            this.controller.getPaymentTypes,
         )
         .post(
            this.routesNames.SINGULAR + '/operative/payment-type',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CreatePaymentTypeDTO, 'body'),
            this.controller.createPaymentType,
         )
         .delete(
            this.routesNames.SINGULAR + '/operative/payment-type/:id',
            this.middleware.verifyToken,
            this.controller.deletePaymentType,
         )
         .get(
            this.routesNames.SINGULAR + '/operative/teams',
            this.middleware.verifyToken,
            this.controller.getTeams,
         )
         .post(
            this.routesNames.SINGULAR + '/operative/team',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CreateTeamDTO, 'body'),
            this.controller.createTeam,
         )
         .delete(
            this.routesNames.SINGULAR + '/operative/team/:id',
            this.middleware.verifyToken,
            this.controller.deleteTeam,
         )
         .get(
            this.routesNames.SINGULAR + '/operative/pyme-products',
            this.middleware.verifyToken,
            this.controller.getPymeProduct,
         )
         .post(
            this.routesNames.SINGULAR + '/operative/pyme-product',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CreatePymeProductDTO, 'body'),
            this.controller.createPymeProduct,
         )
         .delete(
            this.routesNames.SINGULAR + '/operative/pyme-product/:id',
            this.middleware.verifyToken,
            this.controller.deletePymeProduct,
         )
         .get(
            this.routesNames.SINGULAR + '/operative/divisions',
            this.middleware.verifyToken,
            this.controller.getDivisions,
         )
         .post(
            this.routesNames.SINGULAR + '/operative/division',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CreateDivisionDTO, 'body'),
            this.controller.createDivision,
         )
         .delete(
            this.routesNames.SINGULAR + '/operative/division/:id',
            this.middleware.verifyToken,
            this.controller.deleteDivision,
         )
         .get(
            this.routesNames.SINGULAR + '/operative/gross-incomes',
            this.middleware.verifyToken,
            this.controller.getGrossIncomes,
         )
         .post(
            this.routesNames.SINGULAR + '/operative/gross-income',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CreateGrossIncomeDTO, 'body'),
            this.controller.createGrossIncome,
         )
         .delete(
            this.routesNames.SINGULAR + '/operative/gross-income/:id',
            this.middleware.verifyToken,
            this.controller.deleteGrossIncome,
         )
         .get(
            this.routesNames.SINGULAR + '/operative/monotributists',
            this.middleware.verifyToken,
            this.controller.getMonotributists,
         )
         .post(
            this.routesNames.SINGULAR + '/operative/monotributist',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CreateMonotributistaDTO, 'body'),
            this.controller.createMonotributist,
         )
         .delete(
            this.routesNames.SINGULAR + '/operative/monotributist/:id',
            this.middleware.verifyToken,
            this.controller.deleteMonotributist,
         )
         .get(
            this.routesNames.SINGULAR + '/operative/users',
            this.middleware.verifyToken,
            this.controller.getUsers,
         )
         .get(
            this.routesNames.SINGULAR + '/operative/:Id',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(ClientIdDTO, 'params'),
            this.middleware.checkClientId('operative'),
            this.controller.getOperativeClient,
         )
         .post(
            this.routesNames.SINGULAR + '/operative',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CreateOperativeClientDTO, 'body'),
            this.controller.createOperativeClient,
         )
         .put(
            this.routesNames.SINGULAR + '/operative/:Id',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(ClientIdDTO, 'params'),
            this.middleware.validationMiddleware(CreateOperativeClientDTO, 'body'),
            this.middleware.checkClientId('operative'),
            this.controller.updateOperativeClient,
         )
         .put(
            this.routesNames.SINGULAR + '/operative/:Id/suspend',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(ClientIdDTO, 'params'),
            this.middleware.validationMiddleware(SuspendCommercialClientDTO, 'body'),
            this.middleware.checkClientId('operative'),
            this.controller.suspendUnsuspendOperativeClient,
         )
         .delete(
            this.routesNames.SINGULAR + '/operative/:Id',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(ClientIdDTO, 'params'),
            this.middleware.checkClientId('operative'),
            this.controller.deleteOperativeClient,
         )
         // General Client Routes
         .get(
            this.routesNames.SINGULAR + '/data/fiscal/:fiscal_number',
            this.middleware.verifyToken,
            this.controller.getDataFiscalClient,
         );
   }
}
