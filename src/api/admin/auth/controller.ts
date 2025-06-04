import { Request, Response } from 'express';
import { authServices } from './service';
import { success, error } from '../../../utils/network/responses';
import { IUser } from '../../../dao/interfaces';

export class AuthController {
   async login(req: Request, res: Response) {
      const { username, password } = req.body;
      await authServices
         .login(username, password)
         .then((body) => {
            return success({ req, res, body });
         })
         .catch((err) => {
            return error({ req, res, body: err.message });
         });
   }

   async changePassword(req: Request, res: Response) {
      const userData: IUser = req.body.userData;
      const { password: newPassword } = req.body;
      if (!userData || !userData.id) {
         return error({
            req,
            res,
            body: 'User data is missing or invalid',
            status: 400,
         });
      }
      await authServices
         .changePassword(userData.id, newPassword, userData)
         .then((body) => {
            return success({ req, res, body });
         })
         .catch((err) => {
            return error({ req, res, body: err.message });
         });
   }

   async resetPassword(req: Request, res: Response) {
      const userData: IUser = req.body.userData;
      await authServices
         .resetPassword(userData)
         .then((body) => {
            return success({ req, res, body });
         })
         .catch((err) => {
            return error({ req, res, body: err.message });
         });
   }
}
