import { Request, Response } from 'express';
import {
   CommercialClientsFilterDTO,
   CreateCommercialClientDTO,
   UpdateCommercialClientDTO,
} from './dto';
import { clientServices } from './service';
import { success, error } from '../../../utils/network/responses';
import { PAGE_LIMIT } from '../../../abstractions/sequelizeBases/baseFind';

export class ClientController {
   async createCommercialClient(req: Request, res: Response): Promise<void> {
      const createCommercialClientDTO: CreateCommercialClientDTO = req.body;
      const userData = req.body.userData;
      await clientServices
         .createCommercialClient(createCommercialClientDTO, userData)
         .then((body) => success({ req, res, body }))
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
         .then((body) => success({ req, res, body }))
         .catch((err) => {
            error({ req, res, body: err });
         });
   }

   async getCommercialClients(req: Request, res: Response): Promise<void> {
      const filter: CommercialClientsFilterDTO = JSON.parse(JSON.stringify(req.query));
      const { page, pageSize, sortBy, sortDesc } = filter;

      await clientServices
         .getCommercialClients({ page, pageSize, sortBy, sortDesc })
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
         .then((body) => success({ req, res, body }))
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
