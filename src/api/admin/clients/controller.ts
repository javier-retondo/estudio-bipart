import { Request, Response } from 'express';
import {
   CommercialClientsFilterDTO,
   CreateCommercialClientDTO,
   CreateDivisionDTO,
   CreateGrossIncomeDTO,
   CreateMonotributistaDTO,
   CreatePymeProductDTO,
   CreateTeamDTO,
   UpdateCommercialClientDTO,
} from './dto';
import { clientServices } from './service';
import { success, error } from '../../../utils/network/responses';
import { PAGE_LIMIT } from '../../../abstractions/sequelizeBases/baseFind';
import { logService } from '../../../dao/Log/service';
import { LOG_TYPES } from '../../../dao/Log/interface';
import {
   IDivision,
   IGrossIncome,
   IMonotributist,
   IPymeProduct,
   IUser,
} from '../../../dao/interfaces';
import { userService } from '../../../dao/User/service';
import { teamService } from '../../../dao/Team/service';
import { paymentTypeService } from '../../../dao/PaymentType/service';
import { pymeProductService } from '../../../dao/PymeProduct/service';
import { divisionService } from '../../../dao/Division/service';
import { grossIncomeService } from '../../../dao/GrossIncome/service';
import { monotributistService } from '../../../dao/Monotributist/service';

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

   async getDataFiscalClient(req: Request, res: Response): Promise<void> {
      const fiscal_number = Number(req.params.fiscal_number);
      await clientServices
         .getDataFiscalClient(fiscal_number)
         .then((body) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }

   async suspendUnsuspendCommercialClient(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.Id);
      const userData = req.body.userData;
      const reason = req.body.reason;
      await clientServices
         .suspendUnsuspendCommercialClient(id, userData, reason)
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.UPDATE,
                  user_id: userData.id,
                  description: `El usuario ${userData.username} ha ${
                     body.suspended_at ? 'suspendido' : 'reanudado'
                  } el cliente comercial: ${body.fiscal_name} (${body.fiscal_number})`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async getPaymentTypes(req: Request, res: Response): Promise<void> {
      await paymentTypeService
         .getPaymentTypes()
         .then((body) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }

   async createPaymentType(req: Request, res: Response): Promise<void> {
      const paymentTypeData = req.body;
      const userData: IUser = req.body.userData;
      await paymentTypeService
         .createPaymentType({
            ...paymentTypeData,
            created_by: Number(userData.id),
         })
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.CREATE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha creado un nuevo tipo de pago: ${body.name}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async deletePaymentType(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);
      const userData: IUser = req.body.userData;
      await paymentTypeService
         .deletePaymentType(id, userData)
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.DELETE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha eliminado el tipo de pago con ID: ${id}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async getTeams(req: Request, res: Response): Promise<void> {
      return teamService
         .getTeams()
         .then((body) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }

   async createTeam(req: Request, res: Response): Promise<void> {
      const teamData: CreateTeamDTO = req.body;
      const { team_name, description } = teamData;
      const userData: IUser = req.body.userData;
      await teamService
         .createTeam({ team_name, description, created_by: Number(userData.id) })
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.CREATE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha creado un nuevo equipo: ${body.team_name}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async deleteTeam(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);
      const userData: IUser = req.body.userData;
      await teamService
         .deleteTeam(id, userData)
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.DELETE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha eliminado el equipo con ID: ${id}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async getPymeProduct(req: Request, res: Response): Promise<void> {
      await pymeProductService
         .getPymeProducts()
         .then((body: IPymeProduct[]) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }

   async createPymeProduct(req: Request, res: Response): Promise<void> {
      const pymeProductData: CreatePymeProductDTO = req.body;
      const userData: IUser = req.body.userData;
      await pymeProductService
         .createPymeProduct({
            ...pymeProductData,
            created_by: Number(userData.id),
         })
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.CREATE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha creado un nuevo producto PyME: ${body.pyme_prod_name}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async deletePymeProduct(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);
      const userData: IUser = req.body.userData;
      await pymeProductService
         .deletePymeProduct(id, userData)
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.DELETE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha eliminado el producto PyME con ID: ${id}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async getDivisions(req: Request, res: Response): Promise<void> {
      await divisionService
         .getDivisions()
         .then((body: IDivision[]) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }

   async createDivision(req: Request, res: Response): Promise<void> {
      const divisionData: CreateDivisionDTO = req.body;
      const userData: IUser = req.body.userData;
      await divisionService
         .createDivision({
            ...divisionData,
            created_by: Number(userData.id),
         })
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.CREATE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha creado una nueva división: ${body.division_name}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }
   async deleteDivision(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);
      const userData: IUser = req.body.userData;
      await divisionService
         .deleteDivision(id, userData)
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.DELETE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha eliminado la división con ID: ${id}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async getGrossIncomes(req: Request, res: Response): Promise<void> {
      await grossIncomeService
         .getGrossIncomes()
         .then((body: IGrossIncome[]) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }

   async createGrossIncome(req: Request, res: Response): Promise<void> {
      const grossIncomeData: CreateGrossIncomeDTO = req.body;
      const userData: IUser = req.body.userData;
      await grossIncomeService
         .createGrossIncome({
            ...grossIncomeData,
            created_by: Number(userData.id),
         })
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.CREATE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha creado un nuevo ingreso bruto: ${body.name}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async deleteGrossIncome(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);
      const userData: IUser = req.body.userData;
      await grossIncomeService
         .deleteGrossIncome(id, userData)
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.DELETE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha eliminado el ingreso bruto con ID: ${id}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async getMonotributists(req: Request, res: Response): Promise<void> {
      await monotributistService
         .getMonotributists()
         .then((body: IMonotributist[]) => success({ req, res, body }))
         .catch((err) => error({ req, res, body: err }));
   }

   async createMonotributist(req: Request, res: Response): Promise<void> {
      const monotributistData: CreateMonotributistaDTO = req.body;
      const userData: IUser = req.body.userData;
      await monotributistService
         .createMonotributist({
            ...monotributistData,
            created_by: Number(userData.id),
         })
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.CREATE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha creado un nuevo monotributista: ${body.name}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }
   async deleteMonotributist(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);
      const userData: IUser = req.body.userData;
      await monotributistService
         .deleteMonotributist(id, userData)
         .then((body) => {
            setImmediate(() => {
               logService.create({
                  type: LOG_TYPES.DELETE,
                  user_id: Number(userData.id),
                  description: `El usuario ${userData.firstname} ${userData.lastname} (ID: ${userData.id}) ha eliminado el monotributista con ID: ${id}`,
                  endpoint: req.originalUrl,
                  method: req.method,
                  date_time: new Date(),
               });
            });
            success({ req, res, body });
         })
         .catch((err) => error({ req, res, body: err }));
   }

   async getUsers(req: Request, res: Response): Promise<void> {
      await userService
         .getUsers({
            page: 1,
            pageSize: 100,
            sortBy: 'username',
            sortDesc: 'ASC',
         })
         .then((body) => {
            success({ req, res, body: body.rows });
         });
   }
}
