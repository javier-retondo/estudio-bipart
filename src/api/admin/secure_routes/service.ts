import { IUser } from '../../../dao/interfaces';

class RouteServices {
   async checkUserModule(userData: IUser, moduleId: number) {
      if (userData.is_admin) {
         return true;
      }
      return userData.Modules?.some((mod) => mod.id === moduleId);
   }
}

const routeServices = new RouteServices();
export { routeServices };
