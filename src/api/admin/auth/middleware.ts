import { NextFunction, Request, Response } from 'express';
import { GlobalMW } from '../../../middlewares/global';
import { error } from '../../../utils/network/responses';

export class AuthMiddleware extends GlobalMW {
   async changePassword(req: Request, res: Response, next: NextFunction) {
      const { userData } = req.body;
      if (!userData || !userData.id) {
         return error({
            req,
            res,
            body: 'User data is missing or invalid',
            status: 400,
         });
      }
      next();
   }
}
