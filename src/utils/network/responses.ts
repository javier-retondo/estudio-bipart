import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { DateTransformerClass } from '../../utils/transformers/dateTransformer';
//import { ISessionData } from '../../utils/interfaces/general';
//import { IErrorLog } from '../../dao/ErrorLog/interface';
//import { errorLogsCreator } from '../../dao/ErrorLog/crud/create';
//import { getLocationFromIP } from '../functions/getAddressIP';
class Responses {
   success = (props: {
      req: Request;
      res: Response;
      status?: number;
      body?: any;
      difHora?: number;
      pagination?: { page: number; limit: number; total: number };
   }) => {
      try {
         props.body =
            typeof props.body === 'object' && props.difHora
               ? new DateTransformerClass(
                    props.body,
                    props.difHora,
                    'DD/MM/YYYY HH:mm:ss',
                 ).transform()
               : props.body;
      } catch (error) {
         console.error(error);
      }
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
         //const address = ip ? await getLocationFromIP(ip.toString()) : null;
         //const userData: ISessionData = props.req.body.userData;
         // const { Usu_Id, Emp_Id } = userData || { Usu_Id: undefined, Emp_Id: undefined };
         /*
         const errorLog: IErrorLog = {
            Err_Date: new Date(),
            Err_Route: props.req.originalUrl,
            Err_Method: props.req.method,
            Err_Ip: ip?.toString(),
            Usu_Id: Usu_Id,
            Emp_Id: Emp_Id,
            Err_Query: JSON.stringify(props.req.query),
            Err_Params: JSON.stringify(props.req.params),
            Err_ErrorMessage: props.body?.message || 'Error desconocido',
            Err_Stack: props.body?.stack || null,
            Err_Sql: props.body?.sql || null,
            Err_Country: address?.country,
            Err_Region: address?.region,
            Err_City: address?.city,
            Err_Lat: address?.lat,
            Err_Lon: address?.lon,
         };
        */

         try {
            // await errorLogsCreator.createEntities([errorLog]);
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
