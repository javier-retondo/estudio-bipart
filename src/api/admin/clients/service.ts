import { sequelize } from '../../../config';
import { commercialClientService } from '../../../dao/CommercialClient/service';
import { ICommercialClient, IUser } from '../../../dao/interfaces';
import { COMMERCIAL_CLIENT } from '../../../dao/metadata';
import { getCuitData } from '../../../utils/arca';
import {
   CommercialClientsFilterDTO,
   CreateCommercialClientDTO,
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

   async getOperativeClients(id: number) {
      console.log('id :>> ', id);
      return [];
   }
}

const clientServices = new CommercialClientServices();
export { clientServices };
