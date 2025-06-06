import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { ILog, IUser } from '../../dao/interfaces';
import { LOG_TYPES } from '../../dao/Log/interface';
import { Log } from '../../dao/models';

class Responses {
   success = (props: {
      req: Request;
      res: Response;
      status?: number;
      body?: any;
      difHora?: number;
      pagination?: { page: number; limit: number; total: number };
   }) => {
      const { pagination } = props;
      if (pagination) {
         const { page, limit, total } = pagination;

         const totalPages = Math.ceil(total / limit);

         let nextPage: number | null = page + 1;
         if (nextPage > totalPages) {
            nextPage = null;
         }
         let previousPage: number | null = page - 1;
         if (previousPage < 1) {
            previousPage = null;
         }

         props.res.status(props.status || 200).send({
            error: false,
            status: props.status || 200,
            body: props.body || '',
            pagination: {
               totalCount: total,
               pageCount: props.body.length,
               currentPage: page,
               totalPages: Math.ceil(total / limit),
               previousPage: previousPage,
               nextPage: nextPage,
            },
         });
      } else {
         props.res.status(props.status || 200).send({
            error: false,
            status: props.status || 200,
            body: props.body || '',
         });
      }
   };

   error = async (props: {
      req: Request;
      res: Response;
      status?: number;
      body?: any;
      next?: NextFunction;
   }) => {
      const ip = props.req.headers['x-forwarded-for'] || props.req.socket.remoteAddress;
      const statusCode = props.status || 500;

      if (statusCode === 500) {
         const userData: IUser = props.req.body.userData;
         const { id: userId } = userData || { id: undefined };

         const errorLog: ILog = {
            user_id: userId,
            endpoint: props.req.originalUrl,
            method: props.req.method,
            description: props.body?.message || '',
            date_time: new Date(),
            type: LOG_TYPES.ERROR,
            stack_trace: props.body?.stack || '',
            sql: props.body?.sql || '',
         };
         console.log('errorLog :>> ', errorLog);
         try {
            await Log.create(errorLog);
         } catch (dbError: any) {
            console.error('❌ Error guardando log en BD:', dbError.message);
         }
      }

      console.error('--------------------> ERROR <--------------------');
      console.error('Error: ', props.body);
      console.error('Route: ', props.req.originalUrl);
      console.error('Method: ', props.req.method);
      console.error('IP: ', ip);
      console.error('-------------------------------------------------');

      const message = props.body?.message || 'Error interno del servidor';

      props.res.status(statusCode).json({
         error: true,
         status: statusCode,
         body: statusCode === 500 ? message : props.body || '',
      });
   };

   file = (props: {
      req: Request;
      res: Response;
      filePath: string;
      contentType: string;
      fileName: string;
      data?: object;
   }) => {
      const { res, filePath, contentType, fileName, data } = props;
      const file = fs.createReadStream(filePath);
      const stat = fs.statSync(filePath);
      if (data) res.setHeader('dataJson', JSON.stringify(data));
      res.setHeader('Content-Length', stat.size);
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      file.pipe(res);
   };
}

export const { success, error, file } = new Responses();
