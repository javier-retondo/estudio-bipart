import { Request, Response } from 'express';
import {
   CommercialClientsFilterDTO,
   CreateCommercialClientDTO,
   UpdateCommercialClientDTO,
} from './dto';
import { clientServices } from './service';
import { success, error } from '../../../utils/network/responses';
import { PAGE_LIMIT } from '../../../abstractions/sequelizeBases/baseFind';
import { logService } from '../../../dao/Log/service';
import { LOG_TYPES } from '../../../dao/Log/interface';

export class ClientController {
   async createCommercialClient(req: Request, res: Response): Promise<void> {
      const createCommercialClientDTO: CreateCommercialClientDTO = req.body;
      const userData = req.body.userData;
      await clientServices
         .createCommercialClient(createCommercialClientDTO, userData)
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.CREATE,
                  user_id: userData.id,
                  description: `El usuario ${userData.username} ha creado un nuevo cliente comercial: ${body.fiscal_name} (${body.fiscal_number})`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => {
            error({ req, res, body: err });
         });
   }

   async updateCommercialClient(req: Request, res: Response): Promise<void> {
      const updateCommercialClientDTO: UpdateCommercialClientDTO = req.body;
      const id = Number(req.params.Id);
      const userData = req.body.userData;
      await clientServices
         .updateCommercialClient(id, updateCommercialClientDTO, userData)
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.UPDATE,
                  user_id: userData.id,
                  description: `El usuario ${userData.username} ha actualizado el cliente comercial: ${body?.fiscal_name} (${body?.fiscal_number})`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => {
            error({ req, res, body: err });
         });
   }

   async getCommercialClients(req: Request, res: Response): Promise<void> {
      const filter: CommercialClientsFilterDTO = JSON.parse(JSON.stringify(req.query));
      const { page, pageSize, sortBy, sortDesc, status, search } = filter;
      await clientServices
         .getCommercialClients({ page, pageSize, sortBy, sortDesc, status, search })
         .then((body) => {
            let pagination = {
               page: 1,
               limit: body.count < PAGE_LIMIT ? body.count : PAGE_LIMIT,
               total: body.count,
            };
            if (page && pageSize) {
               pagination = {
                  page: Number(page),
                  limit: Number(pageSize),
                  total: body.count,
               };
            }
            success({ req, res, body: body.rows, pagination });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async getCommercialClient(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.Id);
      await clientServices
         .getCommercialClient(id)
         .then((body) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }

   async deleteCommercialClient(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.Id);
      const userData = req.body.userData;
      await clientServices
         .softDeleteCommercialClient(id, userData)
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.DELETE,
                  user_id: userData.id,
                  description: `El usuario ${userData.username} ha eliminado el cliente comercial con ID: ${id}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async getOperativeClients(req: Request, res: Response): Promise<void> {
      const commercialClientId = Number(req.params.Id);
      await clientServices
         .getOperativeClients(commercialClientId)
         .then((body) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }
}
