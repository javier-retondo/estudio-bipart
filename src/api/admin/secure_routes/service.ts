import { IUser } from '../../../dao/interfaces';

class RouteServices {
   async checkUserModule(userData: IUser, module: string) {
      if (userData.is_admin) {
         return true;
      }
      return userData.Modules?.some((mod) => mod.module_name === module);
   }
}

const routeServices = new RouteServices();
export { routeServices };
