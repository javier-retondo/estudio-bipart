import { Request, Response } from 'express';
import { routeServices } from './service';
import { success, error } from '../../../utils/network/responses';
import { IUser } from '../../../dao/interfaces';

export class RouteController {
   async getRoute(req: Request, res: Response): Promise<void> {
      const userData: IUser = req.body.userData;
      const module = req.params.module;
      await routeServices
         .checkUserModule(userData, module)
         .then((body) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }
}
