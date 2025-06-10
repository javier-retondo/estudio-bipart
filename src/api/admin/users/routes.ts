import { BaseRouter } from '../../../abstractions/baseRouter';
import { UserController } from './controller';
import { UsersFilterDTO, CreateUserDTO, UpdateUserDTO, UserIdDTO } from './dto';
import { UserMiddleware } from './middleware';

const USER_ROUTES = {
   SINGULAR: '/admin/user',
   PLURAL: '/admin/users',
};

export class UserRouter extends BaseRouter<UserController, UserMiddleware, typeof USER_ROUTES> {
   constructor() {
      super(UserController, UserMiddleware, USER_ROUTES);
   }

   routes() {
      this.router
         .get(
            this.routesNames.SINGULAR + '/clients/commercial',
            this.middleware.verifyToken,
            this.controller.getCommercialClients,
         )
         .get(
            this.routesNames.SINGULAR + '/my-data',
            this.middleware.verifyToken,
            this.controller.getMyData,
         )
         .get(
            this.routesNames.SINGULAR + '/modules',
            this.middleware.verifyToken,
            this.controller.getModules,
         )
         .get(
            this.routesNames.SINGULAR + '/:Id',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(UserIdDTO, 'params'),
            this.middleware.checkUserId(),
            this.controller.getUser,
         )
         .get(
            this.routesNames.PLURAL,
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(UsersFilterDTO, 'query'),
            this.controller.getUsers,
         )
         .post(
            this.routesNames.SINGULAR,
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(CreateUserDTO, 'body'),
            this.controller.createUser,
         )
         .put(
            this.routesNames.SINGULAR + '/:Id',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(UpdateUserDTO, 'body'),
            this.middleware.validationMiddleware(UserIdDTO, 'params'),
            this.middleware.checkUserId(),
            this.controller.updateUser,
         )
         .delete(
            this.routesNames.SINGULAR + '/:Id',
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(UserIdDTO, 'params'),
            this.middleware.checkUserId(),
            this.controller.deleteUser,
         );
   }
}
