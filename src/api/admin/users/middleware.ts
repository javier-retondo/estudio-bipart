import { NextFunction, Request, Response } from 'express';
import { GlobalMW } from '../../../middlewares/global';
import { error } from '../../../utils/network/responses';
import { userService } from '../../../dao/User/service';

export class UserMiddleware extends GlobalMW {
   checkUserId() {
      return async (req: Request, res: Response, next: NextFunction) => {
         const userId = Number(req.params.Id);
         if (isNaN(userId) || userId <= 0) {
            return error({ req, res, body: 'ID de usuario inválido!', status: 400 });
         }
         const user = await userService.userCheckExists({ id: userId });
         if (!user) {
            return error({ req, res, body: 'Usuario no encontrado', status: 404 });
         }
         next();
      };
   }
}
