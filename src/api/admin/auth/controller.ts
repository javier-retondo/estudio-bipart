import { Request, Response } from 'express';
import { authServices } from './service';
import { success, error } from '../../../utils/network/responses';
import { IUser } from '../../../dao/interfaces';
import { logService } from '../../../dao/Log/service';
import { LOG_TYPES } from '../../../dao/Log/interface';

export class AuthController {
   async login(req: Request, res: Response) {
      const { username, password } = req.body;
      await authServices
         .login(username, password)
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.LOGIN,
                  user_id: body.user.id,
                  description: `El usuario ${body.user.username} ha iniciado sesión`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
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
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.UPDATE,
                  user_id: userData.id,
                  description: `El usuario ${userData.username} ha cambiado su contraseña`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
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
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.UPDATE,
                  user_id: userData.id,
                  description: `El usuario ${userData.username} ha solicitado un reinicio de contraseña`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            return success({ req, res, body });
         })
         .catch((err) => {
            return error({ req, res, body: err.message });
         });
   }
}
