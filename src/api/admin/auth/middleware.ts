import { NextFunction, Request, Response } from 'express';
import { GlobalMW } from '../../../middlewares/global';
import { error } from '../../../utils/network/responses';
import { userService } from '../../../dao/User/service';

export class AuthMiddleware extends GlobalMW {
   async checkUsername(req: Request, res: Response, next: NextFunction) {
      const { username } = req.body;
      const userCheck = await userService.userCheckExists({ username });
      if (!userCheck) {
         return error({ req, res, body: 'El nombre de usuario no existe', status: 400 });
      }
      next();
   }
   async checkEmail(req: Request, res: Response, next: NextFunction) {
      const { email } = req.body;
      const user = await userService.getUserByCriteria({ email });
      if (!user) {
         return error({ req, res, body: 'El correo electrónico no existe', status: 400 });
      }
      req.body.userData = user;
      next();
   }
}
