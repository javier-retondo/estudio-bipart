import { AuthRouter } from './admin/auth/routes';
import { RouteRouter } from './admin/secure_routes/routes';

export const Routes = [new AuthRouter().router, new RouteRouter().router];
