import { NextFunction, Request, Response } from 'express';
import { GlobalMW } from '../../../middlewares/global';
import { error } from '../../../utils/network/responses';
import { commercialClientService } from '../../../dao/CommercialClient/service';

export class ClientMiddleware extends GlobalMW {
   checkClientId() {
      return async (req: Request, res: Response, next: NextFunction) => {
         const clientId = req.params.Id;
         if (!clientId || isNaN(Number(clientId))) {
            return error({
               req,
               res,
               body: 'Invalid client ID',
               status: 400,
            });
         }
         const isValidId = await commercialClientService.checkComercialClientExists({
            id: Number(clientId),
         });
         if (!isValidId) {
            return error({
               req,
               res,
               body: `El cliente comercial con ID ${clientId} no existe`,
               status: 404,
            });
         }
         next();
      };
   }
   checkClientFiscalNumber() {
      return async (req: Request, res: Response, next: NextFunction) => {
         const { fiscal_number } = req.body;
         const clientId = req.params.Id ? Number(req.params.Id) : undefined;
         if (!fiscal_number) {
            return error({
               req,
               res,
               body: 'Fiscal number is required',
               status: 400,
            });
         }
         const exists = await commercialClientService.checkComercialClientExists(
            {
               fiscal_number,
            },
            clientId,
         );
         if (exists) {
            return error({
               req,
               res,
               body: `Ya existe un cliente con el número fiscal proporcionado`,
               status: 400,
            });
         }
         next();
      };
   }
}
