import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { error } from '../utils/network/responses';
import { validate } from 'class-validator';
import { redisClient } from '../config/redisManager';
import jwt from 'jsonwebtoken';
import { userService } from '../dao/User/service';

export class GlobalMW {
   async verifyToken(req: Request, res: Response, next: NextFunction) {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
         res.status(400).json({ message: 'Authorization token not provided' });
         return;
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
         console.log('No se ha proporcionado el token de autorización');
         return error({
            req,
            res,
            body: 'No se ha proporcionado el token de autorización',
            status: 401,
         });
      }

      try {
         const sessionDataRedis = await redisClient.get(`session:${String(token)}`);
         if (sessionDataRedis) {
            const userData = JSON.parse(sessionDataRedis);
            const validToken = await redisClient.get(`user_tokens:${userData.id}`);
            if (!validToken || validToken !== token) {
               throw new Error('Token is invalid or expired');
            }
            console.log('------------ Cached User Data -------------');
            req.body.userData = userData;
         } else {
            const decoded = jwt.verify(token, process.env.SECRET_KEY || 'defaultsecret');
            if (
               typeof decoded === 'object' &&
               decoded !== null &&
               'id' in decoded &&
               'username' in decoded
            ) {
               const tokenData: { id: number; username: string } = {
                  id: (decoded as any).id,
                  username: (decoded as any).username,
               };
               const validToken = await redisClient.get(`user_tokens:${tokenData.id}`);

               if (!validToken || validToken !== token) {
                  throw new Error('Token is invalid or expired');
               }
               const userData = await userService.getUserById(tokenData.id);
               if (!userData) {
                  throw new Error('User not found');
               }
               if (userData.deleted_at || userData.suspended_at) {
                  throw new Error('User is inactive or suspended');
               }
               req.body.userData = userData;
               await redisClient.set(`session:${String(token)}`, JSON.stringify(userData), 60);
            } else {
               throw new Error('Token payload does not contain required user data');
            }
         }
         next();
      } catch (error) {
         console.log('Token no válido - Usuario inexistente/inactivo o token expirado');
         console.log(error);
         res.status(401).json({
            error: true,
            status: 401,
            body: 'Token no válido - Usuario inexistente/inactivo o token expirado',
         });
      }
   }

   responseCachedStaticData = async (req: Request, res: Response, next: () => void) => {
      const key = req.originalUrl || req.url;

      const cachedData = await redisClient.get(key);
      if (cachedData) {
         const parsedData = JSON.parse(cachedData);
         console.log('---------------------------------');
         console.log('Cacheado:');
         console.log('Ruta: ', key);
         console.log('---------------------------------');
         return res
            .header({
               'Content-Type': 'application/json',
               'Cache-Control': 'public, max-age=3600',
            })
            .status(200)
            .send(parsedData);
      }

      const originalSend = res.send.bind(res);

      res.send = (body: any): Response<any> => {
         redisClient.set(key, JSON.stringify(body), 3600);
         return originalSend(body);
      };

      next();
   };

   validationMiddleware(
      type: any,
      target: 'body' | 'query' | 'params',
   ): (req: Request, res: Response, next: NextFunction) => Promise<void> {
      return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
         const errors: {
            target: 'body' | 'query' | 'params';
            error: {
               property: string;
               constraints: any;
            }[];
         }[] = [];
         if (target === 'body') {
            const dto: typeof type = plainToInstance(type, req.body);
            const bodyErrors = await validate(dto);
            if (bodyErrors.length > 0) {
               errors.push({
                  target: 'body',
                  error: bodyErrors.map((err) => {
                     function getChildrenErrors(children: any, property: string) {
                        return children.map((child: any) => {
                           if (child.constraints) {
                              return {
                                 property: property + '/' + child.property,
                                 constraints: child.constraints,
                              };
                           }
                           return (
                              child.children &&
                              getChildrenErrors(
                                 child.children,
                                 property + '/' + child.property,
                              ).flat()
                           );
                        });
                     }

                     return {
                        property: err.property,
                        constraints: err.constraints,
                        children:
                           err.children && getChildrenErrors(err.children, err.property).flat(),
                     };
                  }),
               });
            }
            req.body = dto;
         }
         if (target === 'query') {
            const dto: typeof type = plainToInstance(type, req.query);
            const queryErrors = await validate(dto);
            if (queryErrors.length > 0)
               errors.push({
                  target: 'query',
                  error: queryErrors.map((err) => {
                     return {
                        property: err.property,
                        constraints: err.constraints,
                     };
                  }),
               });

            req.query = dto;
         }
         if (target === 'params') {
            const dto: typeof type = plainToInstance(type, req.params);
            const paramsErrors = await validate(dto);
            if (paramsErrors.length > 0)
               errors.push({
                  target: 'params',
                  error: paramsErrors.map((err) => {
                     return {
                        property: err.property,
                        constraints: err.constraints,
                     };
                  }),
               });

            req.params = dto;
         }
         if (errors.length > 0) {
            error({ req, res, body: errors, status: 400 });
         } else {
            next();
         }
      };
   }
}
