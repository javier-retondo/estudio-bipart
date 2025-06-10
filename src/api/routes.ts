import { AuthRouter } from './admin/auth/routes';
import { ClientRouter } from './admin/clients/routes';
import { LogRouter } from './admin/logs/routes';
import { RouteRouter } from './admin/secure_routes/routes';
import { UserRouter } from './admin/users/routes';

export const Routes = [
   new AuthRouter().router,
   new RouteRouter().router,
   new UserRouter().router,
   new ClientRouter().router,
   new LogRouter().router,
];
