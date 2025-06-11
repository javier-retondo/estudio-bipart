import { sequelize } from '../../../config';
import { commercialClientService } from '../../../dao/CommercialClient/service';
import { ICommercialClient, IOperativeClient, IUser } from '../../../dao/interfaces';
import { COMMERCIAL_CLIENT, OPERATIVE_CLIENT } from '../../../dao/metadata';
import {
   IOperativeClientPayload,
   operativeClientService,
} from '../../../dao/OperativeClient/service';
import { getCuitData } from '../../../utils/arca';
import {
   CommercialClientsFilterDTO,
   CreateCommercialClientDTO,
   CreateOperativeClientDTO,
   OperativeClientsFilterDTO,
   UpdateCommercialClientDTO,
} from './dto';

class CommercialClientServices {
   private async handleTransaction<T>(operation: (transaction: any) => Promise<T>): Promise<T> {
      const transaction = await sequelize.transaction();
      const result = await operation(transaction);
      await transaction.commit();
      return result;
   }

   async createCommercialClient(
      createCommercialClientDTO: CreateCommercialClientDTO,
      userData: IUser,
   ) {
      const {
         fiscal_name,
         fiscal_number,
         is_physical_person,
         vat_condition_id,
         email,
         phone,
         province,
         city,
         address,
         observations,
      } = createCommercialClientDTO;
      const { id: userId } = userData;

      return commercialClientService.createCommercialClient({
         fiscal_name,
         fiscal_number,
         is_physical_person,
         vat_condition_id,
         email,
         phone,
         province,
         city,
         address,
         observations,
         created_by: userId as number,
      });
   }

   async updateCommercialClient(
      id: number,
      updateCommercialClientDTO: UpdateCommercialClientDTO,
      userData: IUser,
   ) {
      const {
         fiscal_name,
         fiscal_number,
         is_physical_person,
         vat_condition_id,
         email,
         phone,
         province,
         city,
         address,
         observations,
      } = updateCommercialClientDTO;
      const { id: userId } = userData;

      return commercialClientService.updateCommercialClient(
         id,
         {
            fiscal_name,
            fiscal_number,
            is_physical_person,
            vat_condition_id,
            email,
            phone,
            province,
            city,
            address,
            observations,
         },
         userId as number,
      );
   }

   async getCommercialClients(CommercialClientsFilterDTO: CommercialClientsFilterDTO) {
      const { page, pageSize, sortBy, sortDesc, search, status } = CommercialClientsFilterDTO;
      return commercialClientService.getCommercialClients(
         [
            COMMERCIAL_CLIENT.COLUMNS.ID,
            COMMERCIAL_CLIENT.COLUMNS.FISCAL_NAME,
            COMMERCIAL_CLIENT.COLUMNS.FISCAL_NUMBER,
            COMMERCIAL_CLIENT.COLUMNS.SUSPENDED_AT,
            COMMERCIAL_CLIENT.COLUMNS.CREATED_AT,
         ],
         [],
         page,
         pageSize,
         sortBy,
         sortDesc ? 'DESC' : 'ASC',
         search,
         status,
      );
   }

   async getCommercialClient(id: number) {
      return commercialClientService.getCommercialClientById(
         id,
         Object.values(COMMERCIAL_CLIENT.COLUMNS),
         [],
      );
   }

   async softDeleteCommercialClient(id: number, userData: IUser) {
      const { id: userId } = userData;
      return commercialClientService.deleteCommercialClient(id, userId as number);
   }

   async suspendUnsuspendCommercialClient(
      id: number,
      userData: IUser,
      reason?: string,
   ): Promise<ICommercialClient> {
      const { id: userId } = userData;
      const client = await commercialClientService.getCommercialClientById(id, [
         COMMERCIAL_CLIENT.COLUMNS.SUSPENDED_AT,
         COMMERCIAL_CLIENT.COLUMNS.SUSPENDED_BY,
      ]);
      if (!client) {
         throw new Error(`Commercial client with ID ${id} not found`);
      }
      const suspended = client.suspended_at ? true : false;
      if (suspended) {
         return await commercialClientService.unsuspendCommercialClient(id, userId as number);
      }
      return await commercialClientService.suspendCommercialClient(id, userId as number, reason);
   }

   async getDataFiscalClient(fiscal_number: number) {
      const data = await getCuitData(fiscal_number);
      return data;
   }

   async createOperativeClient(
      createOperativeClientDTO: CreateOperativeClientDTO,
      userData: IUser,
   ): Promise<Partial<IOperativeClientPayload>> {
      const {
         is_balance_product,
         is_risk_product,
         is_pyme_product,
         payment_type,
         risk_product,
         balance_product,
         pyme_product,
         ...operativeClient
      } = createOperativeClientDTO;

      const operativeClientData: IOperativeClientPayload = {
         ...operativeClient,
         payment_type_id: payment_type?.id,
         RiskProduct:
            is_risk_product && risk_product
               ? {
                    team_id: risk_product.team.id,
                 }
               : undefined,
         BalanceProduct:
            is_balance_product && balance_product
               ? {
                    team_id: balance_product.team.id,
                    month_number: balance_product.month_number,
                 }
               : undefined,
         PymeProduct:
            is_pyme_product && pyme_product
               ? {
                    pyme_product_id: pyme_product.pyme_product.id,
                    team_id: pyme_product.team.id,
                    division_id: pyme_product.division.id,
                    gross_income_id: pyme_product.gross_income.id,
                    monotributist_id: pyme_product.monotributist.id,
                    user_id: pyme_product.user.id,
                    DomesticService: {
                       count: pyme_product.domestic_service.count,
                       user_id: pyme_product.domestic_service.user.id,
                    },
                    SocialSecurity: {
                       count: pyme_product.social_security.count,
                       user_id: pyme_product.social_security.user.id,
                    },
                 }
               : undefined,
      };

      return this.handleTransaction(async (transaction) => {
         return operativeClientService.createOperativeClient(
            operativeClientData,
            userData,
            transaction,
         );
      });
   }

   async updateOperativeClient(
      id: number,
      updateOperativeClientDTO: CreateOperativeClientDTO,
      userData: IUser,
   ): Promise<Partial<IOperativeClientPayload>> {
      const {
         is_balance_product,
         is_risk_product,
         is_pyme_product,
         payment_type,
         risk_product,
         balance_product,
         pyme_product,
         ...operativeClient
      } = updateOperativeClientDTO;

      const operativeClientData: IOperativeClientPayload = {
         ...operativeClient,
         payment_type_id: payment_type?.id,
         RiskProduct:
            is_risk_product && risk_product
               ? {
                    team_id: risk_product.team.id,
                 }
               : undefined,
         BalanceProduct:
            is_balance_product && balance_product
               ? {
                    team_id: balance_product.team.id,
                    month_number: balance_product.month_number,
                 }
               : undefined,
         PymeProduct:
            is_pyme_product && pyme_product
               ? {
                    pyme_product_id: pyme_product.pyme_product.id,
                    team_id: pyme_product.team.id,
                    division_id: pyme_product.division.id,
                    gross_income_id: pyme_product.gross_income.id,
                    monotributist_id: pyme_product.monotributist.id,
                    user_id: pyme_product.user.id,
                    DomesticService: {
                       count: pyme_product.domestic_service.count,
                       user_id: pyme_product.domestic_service.user.id,
                    },
                    SocialSecurity: {
                       count: pyme_product.social_security.count,
                       user_id: pyme_product.social_security.user.id,
                    },
                 }
               : undefined,
      };

      return this.handleTransaction(async (transaction) => {
         return operativeClientService.updateOperativeClient(
            id,
            operativeClientData,
            userData as IUser,
            transaction,
         );
      });
   }

   async getOperativeClient(id: number): Promise<CreateOperativeClientDTO> {
      const operativeClient = await operativeClientService.getOperativeClientById(
         id,
         Object.values(OPERATIVE_CLIENT.COLUMNS),
         [
            OPERATIVE_CLIENT.ASSOCIATIONS.RISK_PRODUCT,
            OPERATIVE_CLIENT.ASSOCIATIONS.BALANCE_PRODUCT,
            OPERATIVE_CLIENT.ASSOCIATIONS.PYME_PRODUCT,
            OPERATIVE_CLIENT.ASSOCIATIONS.PAYMENT_TYPE,
         ],
      );

      const {
         PaymentType,
         RiskProduct,
         BalanceProduct,
         PymeProduct,
         fiscal_name,
         fiscal_number,
         is_physical_person,
         activity,
         born_date,
         observations,
         commercial_client_id,
         payment_type_id,
         is_coupon_product,
         is_invoice_product,
         is_system_product,
         is_society_product,
         is_physical_person_product,

         created_at,
         updated_at,
      } = operativeClient;

      interface responseOperativeClient extends CreateOperativeClientDTO {
         id?: number;
         created_at?: Date;
         updated_at?: Date | null;
      }

      const response: responseOperativeClient = {
         id,
         created_at,
         updated_at,
         commercial_client_id: commercial_client_id,
         fiscal_name: fiscal_name,
         fiscal_number: fiscal_number,
         is_physical_person: is_physical_person,
         activity: activity,
         born_date: born_date,
         observations: observations,

         is_coupon_product: is_coupon_product,
         is_invoice_product: is_invoice_product,
         is_system_product: is_system_product,
         is_society_product: is_society_product,
         is_physical_person_product: is_physical_person_product,

         is_balance_product: !!BalanceProduct,
         is_risk_product: !!RiskProduct,
         is_pyme_product: !!PymeProduct,
         payment_type: {
            id: PaymentType?.id || payment_type_id,
            name: PaymentType?.name || '',
         },
         risk_product: RiskProduct
            ? {
                 team: {
                    id: RiskProduct.team_id,
                    team_name: RiskProduct.Team?.team_name || '',
                 },
              }
            : undefined,
         balance_product: BalanceProduct
            ? {
                 team: {
                    id: BalanceProduct.team_id,
                    team_name: BalanceProduct.Team?.team_name || '',
                 },
                 month_number: BalanceProduct.month_number,
              }
            : undefined,
         pyme_product: PymeProduct
            ? {
                 pyme_product: {
                    id: PymeProduct.pyme_product_id,
                    pyme_prod_name: PymeProduct.PymeProduct?.pyme_prod_name || '',
                 },
                 team: {
                    id: PymeProduct.team_id,
                    team_name: PymeProduct.Team?.team_name || '',
                 },
                 division: {
                    id: PymeProduct.division_id,
                    division_name: PymeProduct.Division?.division_name || '',
                 },
                 gross_income: {
                    id: PymeProduct.gross_income_id,
                    name: PymeProduct.GrossIncome?.name || '',
                 },
                 monotributist: {
                    id: PymeProduct.monotributist_id,
                    name: PymeProduct.Monotributist?.name || '',
                 },
                 user: {
                    id: PymeProduct.user_id,
                    firstname: PymeProduct.User?.firstname || '',
                    lastname: PymeProduct.User?.lastname || '',
                    username: PymeProduct.User?.username || '',
                 },
                 domestic_service: {
                    has: !!PymeProduct.DomesticService,
                    count: PymeProduct.DomesticService?.count || 0,
                    user: {
                       id: PymeProduct.DomesticService?.user_id || 0,
                       firstname: PymeProduct.DomesticService?.User?.firstname || '',
                       lastname: PymeProduct.DomesticService?.User?.lastname || '',
                       username: PymeProduct.DomesticService?.User?.username || '',
                    },
                 },
                 social_security: {
                    has: !!PymeProduct.SocialSecurity,
                    count: PymeProduct.SocialSecurity?.count || 0,
                    user: {
                       id: PymeProduct.SocialSecurity?.user_id || 0,
                       firstname: PymeProduct.SocialSecurity?.User?.firstname || '',
                       lastname: PymeProduct.SocialSecurity?.User?.lastname || '',
                       username: PymeProduct.SocialSecurity?.User?.username || '',
                    },
                 },
              }
            : undefined,
      };
      return response;
   }

   async getOperativeClients(
      CommercialClientsFilterDTO: OperativeClientsFilterDTO,
      commercialClientId?: number,
   ) {
      const { page, pageSize, sortBy, sortDesc, search, status } = CommercialClientsFilterDTO;
      return operativeClientService.getOperativeClients(
         [
            OPERATIVE_CLIENT.COLUMNS.ID,
            OPERATIVE_CLIENT.COLUMNS.FISCAL_NAME,
            OPERATIVE_CLIENT.COLUMNS.FISCAL_NUMBER,
            OPERATIVE_CLIENT.COLUMNS.SUSPENDED_AT,
            OPERATIVE_CLIENT.COLUMNS.CREATED_AT,
         ],
         [],
         page,
         pageSize,
         sortBy,
         sortDesc ? 'DESC' : 'ASC',
         commercialClientId,
         search,
         status,
      );
   }

   async softDeleteOperativeClient(id: number, userData: IUser) {
      const { id: userId } = userData;
      return operativeClientService.deleteCommercialClient(id, userId as number);
   }

   async suspendUnsuspendOperativeClient(
      id: number,
      userData: IUser,
      reason?: string,
   ): Promise<IOperativeClient> {
      const { id: userId } = userData;
      const client = await operativeClientService.getOperativeClientById(id, [
         OPERATIVE_CLIENT.COLUMNS.SUSPENDED_AT,
         OPERATIVE_CLIENT.COLUMNS.SUSPENDED_BY,
      ]);
      if (!client) {
         throw new Error(`Operative client with ID ${id} not found`);
      }
      const suspended = client.suspended_at ? true : false;
      if (suspended) {
         return await operativeClientService.unsuspendCommercialClient(id, userId as number);
      }
      return await operativeClientService.suspendCommercialClient(id, userId as number, reason);
   }
}

const clientServices = new CommercialClientServices();
export { clientServices };
