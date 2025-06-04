import { Request, Response } from 'express';
import { UsersFilterDTO, CreateUserDTO, UpdateUserDTO } from './dto';
import { userServices } from './service';
import { success, error } from '../../../utils/network/responses';
import { PAGE_LIMIT } from '../../../abstractions/sequelizeBases/baseFind';
import { moduleService } from '../../../dao/Module/service';

export class UserController {
   async createUser(req: Request, res: Response): Promise<void> {
      const createUserDTO: CreateUserDTO = req.body;
      const userData = req.body.userData;
      await userServices
         .createUser(createUserDTO, userData)
         .then((body) => success({ req, res, body }))
         .catch((err) => {
            error({ req, res, body: err });
         });
   }

   async updateUser(req: Request, res: Response): Promise<void> {
      const updateUserDTO: UpdateUserDTO = req.body;
      const userData = req.body.userData;
      const userId = Number(req.params.Id);
      await userServices
         .updateUser(userId, updateUserDTO, userData)
         .then((body) => success({ req, res, body }))
         .catch((err) => {
            error({ req, res, body: err });
         });
   }

   async getUsers(req: Request, res: Response): Promise<void> {
      const filter: UsersFilterDTO = JSON.parse(JSON.stringify(req.query));
      const { page, pageSize, sortBy, sortDesc, search } = filter;

      await userServices
         .getUsers({ page, pageSize, sortBy, sortDesc, search })
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

   async getUser(req: Request, res: Response): Promise<void> {
      const userId = Number(req.params.Id);
      await userServices
         .getUser(userId)
         .then((body) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }

   async deleteUser(req: Request, res: Response): Promise<void> {
      const userId = Number(req.params.Id);
      const userData = req.body.userData;
      await userServices
         .softDeleteUser(userId, userData)
         .then((body) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }

   async getModules(req: Request, res: Response): Promise<void> {
      await moduleService
         .getAllModules()
         .then((body) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }

   async getCommercialClients(req: Request, res: Response): Promise<void> {
      await userServices
         .getCommercialClients()
         .then((body) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }
}
