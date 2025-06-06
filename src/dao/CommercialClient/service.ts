import { Includeable, WhereOptions } from 'sequelize';
import { OperativeClient, VatCondition } from '../models';
import { ICommercialClient } from './interface';
import { COMMERCIAL_CLIENT } from './metadata';
import { CommercialClient } from './model';
import { Op } from 'sequelize';

class CommercialClientService {
   private getAllAttributes(
      attributesIncludes: (keyof ICommercialClient)[],
   ): (keyof ICommercialClient)[] {
      return Object.values(COMMERCIAL_CLIENT.COLUMNS).filter((column) =>
         attributesIncludes.includes(column),
      );
   }
   private getAllAssociations(includes: (keyof ICommercialClient)[]): Includeable[] {
      return Object.values(COMMERCIAL_CLIENT.ASSOCIATIONS)
         .filter((association) => includes.includes(association))
         .map((association) => {
            if (association === COMMERCIAL_CLIENT.ASSOCIATIONS.OPERATIVE_CLIENT) {
               return {
                  model: OperativeClient,
                  as: association,
                  required: false,
               };
            }
            if (association === COMMERCIAL_CLIENT.ASSOCIATIONS.VAT_CONDITION) {
               return {
                  model: VatCondition,
                  as: association,
                  required: false,
               };
            }
            return undefined;
         })
         .filter((item) => item !== undefined);
   }

   private async getClientModelById(id: number) {
      const client = await CommercialClient.findOne({
         where: { id },
      });
      return client;
   }

   async getCommercialClients(
      attributesIncludes: (keyof ICommercialClient)[],
      includes: (keyof ICommercialClient)[] = [],
      page: number = 1,
      pageSize: number = 10000,
      order: keyof ICommercialClient = 'id',
      orderDesc: 'ASC' | 'DESC' = 'ASC',
      search?: string,
      status?: 'active' | 'suspended',
   ): Promise<{
      rows: Partial<ICommercialClient>[];
      count: number;
   }> {
      const where: WhereOptions<ICommercialClient> = [];
      if (search) {
         where.push({
            [Op.or]: [
               { fiscal_name: { [Op.like]: `%${search}%` } },
               { fiscal_number: { [Op.like]: `%${search}%` } },
               { email: { [Op.like]: `%${search}%` } },
               { phone: { [Op.like]: `%${search}%` } },
               { address: { [Op.like]: `%${search}%` } },
               { city: { [Op.like]: `%${search}%` } },
            ],
         });
      }
      if (status) {
         if (status === 'active') {
            where.push({ suspended_at: null });
         }
         if (status === 'suspended') {
            where.push({ suspended_at: { [Op.ne]: null } });
         }
      }

      const attributes: (keyof ICommercialClient)[] = this.getAllAttributes(attributesIncludes);

      if (attributes.length === 0) {
         throw new Error('No attributes provided for commercial clients');
      }

      const include: Includeable[] = this.getAllAssociations(includes);

      const clients = await CommercialClient.findAndCountAll({
         attributes,
         where,
         include,
         limit: pageSize,
         offset: (page - 1) * pageSize,
         order: [[order, orderDesc]],
      });

      return {
         rows: clients.rows.map((client) => client.dataValues),
         count: clients.count,
      };
   }

   async getCommercialClientById(
      id: number,
      attributesIncludes: (keyof ICommercialClient)[],
      includes: (keyof ICommercialClient)[] = [],
   ): Promise<Partial<ICommercialClient> | null> {
      const attributes: (keyof ICommercialClient)[] = Object.values(
         COMMERCIAL_CLIENT.COLUMNS,
      ).filter((column) => attributesIncludes.includes(column));

      if (attributes.length === 0) {
         throw new Error('No attributes provided for commercial client');
      }

      const include: Includeable[] = this.getAllAssociations(includes);

      const client = await CommercialClient.findOne({
         where: { id },
         attributes,
         include,
      });

      return client ? client.dataValues : null;
   }

   async createCommercialClient(clientData: {
      fiscal_name: string;
      fiscal_number: string;
      is_physical_person: boolean;
      vat_condition_id: number;
      email?: string;
      phone?: string;
      province?: string;
      city?: string;
      address?: string;
      observations?: string;
      created_by: number;
   }): Promise<Partial<ICommercialClient>> {
      const newClient = await CommercialClient.create(clientData);
      if (!newClient || !newClient.dataValues.id) {
         throw new Error('Failed to create commercial client');
      }
      const client = await this.getCommercialClientById(
         newClient.dataValues.id,
         Object.values(COMMERCIAL_CLIENT.COLUMNS),
         Object.values(COMMERCIAL_CLIENT.ASSOCIATIONS),
      );
      if (!client) {
         throw new Error('Failed to retrieve created commercial client');
      }
      return client;
   }

   async updateCommercialClient(
      id: number,
      clientData: Partial<ICommercialClient>,
      updated_by: number,
   ): Promise<Partial<ICommercialClient> | null> {
      const client = await this.getClientModelById(id);
      if (!client) {
         throw new Error(`Commercial client with ID ${id} not found`);
      }
      await client.update({ ...clientData, updated_by, updated_at: new Date() });
      return await this.getCommercialClientById(
         id,
         Object.values(COMMERCIAL_CLIENT.COLUMNS),
         Object.values(COMMERCIAL_CLIENT.ASSOCIATIONS),
      );
   }

   async checkComercialClientExists(
      criteria: Partial<{ id: number; fiscal_number: string }>,
      updateId?: number,
   ): Promise<boolean> {
      const client = await CommercialClient.count({
         where: [criteria, updateId ? { id: { [Op.ne]: updateId } } : {}],
      });
      return client > 0;
   }

   async deleteCommercialClient(id: number, deleted_by: number): Promise<string> {
      const client = await this.getClientModelById(id);
      if (!client) {
         throw new Error(`Commercial client with ID ${id} not found`);
      }
      await client.update({
         deleted_at: new Date(),
         deleted_by,
      });
      return `El cliente comercial con ID ${id} ha sido eliminado exitosamente.`;
   }
}
const commercialClientService = new CommercialClientService();
export { commercialClientService };
