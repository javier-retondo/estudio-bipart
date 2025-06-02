import { BaseRouter } from '../../../abstractions/baseRouter';
import { AuthController } from './controller';
import { AuthLoginDTO, changePasswordDTO } from './dto';
import { AuthMiddleware } from './middleware';

const AUTH_ROUTES = {
   SINGULAR: '/admin/auth',
};

export class AuthRouter extends BaseRouter<AuthController, AuthMiddleware, typeof AUTH_ROUTES> {
   constructor() {
      super(AuthController, AuthMiddleware, AUTH_ROUTES);
   }

   routes() {
      this.router
         .post(
            this.routesNames.SINGULAR,
            this.middleware.validationMiddleware(AuthLoginDTO, 'body'),
            this.controller.login,
         )
         .patch(
            `${this.routesNames.SINGULAR}/password`,
            this.middleware.verifyToken,
            this.middleware.validationMiddleware(changePasswordDTO, 'body'),
            this.controller.changePassword,
         );
   }
}
