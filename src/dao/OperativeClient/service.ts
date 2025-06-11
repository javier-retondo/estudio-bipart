import { Includeable, Transaction, WhereOptions } from 'sequelize';
import { IOperativeClient } from './interface';
import { OPERATIVE_CLIENT } from './metadata';
import {
   Balance,
   CommercialClient,
   Division,
   DomesticService,
   GrossIncome,
   Monotributist,
   OperativeClient,
   PaymentType,
   PymeProduct,
   PymeProdUsage,
   RiskProduct,
   SocialSecurity,
   Team,
   User,
} from '../models';
import { Op } from 'sequelize';
import { IUser } from '../interfaces';
import { BALANCE, DOMESTIC_SERVICE, PYME_PROD_USAGE, USER } from '../metadata';

export interface IOperativeClientPayload {
   commercial_client_id: number;
   fiscal_name: string;
   fiscal_number: string;
   is_physical_person: boolean;
   activity: string;
   born_date: Date;
   observations?: string;

   is_coupon_product: boolean;
   is_invoice_product: boolean;
   is_system_product: boolean;
   is_society_product: boolean;
   is_physical_person_product: boolean;

   payment_type_id: number;
   RiskProduct?: {
      team_id: number;
   };
   BalanceProduct?: {
      team_id: number;
      month_number: number;
   };
   PymeProduct?: {
      pyme_product_id: number;
      team_id: number;
      division_id: number;
      gross_income_id: number;
      monotributist_id: number;
      user_id: number;
      DomesticService?: {
         count: number;
         user_id: number;
      };
      SocialSecurity?: {
         count: number;
         user_id: number;
      };
   };
}

class OperativeClientService {
   private getAllAttributes(
      attributesIncludes: (keyof IOperativeClient)[],
   ): (keyof IOperativeClient)[] {
      return Object.values(OPERATIVE_CLIENT.COLUMNS).filter((column) =>
         attributesIncludes.includes(column),
      );
   }
   private getAllAssociations(includes: (keyof IOperativeClient)[]): Includeable[] {
      return Object.values(OPERATIVE_CLIENT.ASSOCIATIONS)
         .filter((association) => includes.includes(association))
         .map((association) => {
            if (association === OPERATIVE_CLIENT.ASSOCIATIONS.COMMERCIAL_CLIENT) {
               return {
                  model: CommercialClient,
                  as: association,
                  required: false,
               };
            }
            if (association === OPERATIVE_CLIENT.ASSOCIATIONS.PYME_PRODUCT) {
               return {
                  model: PymeProdUsage,
                  as: association,
                  required: false,
                  include: [
                     {
                        model: PymeProduct,
                        as: PYME_PROD_USAGE.ASSOCIATIONS.PYME_PRODUCT,
                        required: false,
                     },
                     {
                        model: Division,
                        as: PYME_PROD_USAGE.ASSOCIATIONS.DIVISION,
                        required: false,
                     },
                     {
                        model: GrossIncome,
                        as: PYME_PROD_USAGE.ASSOCIATIONS.GROSS_INCOME,
                        required: false,
                     },
                     {
                        model: Monotributist,
                        as: PYME_PROD_USAGE.ASSOCIATIONS.MONOTRIBUTIST,
                        required: false,
                     },
                     {
                        model: Team,
                        as: PYME_PROD_USAGE.ASSOCIATIONS.TEAM,
                        required: false,
                     },
                     {
                        model: User,
                        as: PYME_PROD_USAGE.ASSOCIATIONS.USER,
                        required: false,
                        attributes: [
                           USER.COLUMNS.ID,
                           USER.COLUMNS.FIRSTNAME,
                           USER.COLUMNS.LASTNAME,
                           USER.COLUMNS.USERNAME,
                        ],
                     },
                     {
                        model: DomesticService,
                        as: PYME_PROD_USAGE.ASSOCIATIONS.DOMESTIC_SERVICE,
                        required: false,
                        include: [
                           {
                              model: User,
                              as: DOMESTIC_SERVICE.ASSOCIATIONS.USER,
                              required: false,
                              attributes: [
                                 USER.COLUMNS.ID,
                                 USER.COLUMNS.FIRSTNAME,
                                 USER.COLUMNS.LASTNAME,
                                 USER.COLUMNS.USERNAME,
                              ],
                           },
                        ],
                     },
                     {
                        model: SocialSecurity,
                        as: PYME_PROD_USAGE.ASSOCIATIONS.SOCIAL_SECURITY,
                        required: false,
                        include: [
                           {
                              model: User,
                              as: DOMESTIC_SERVICE.ASSOCIATIONS.USER,
                              required: false,
                              attributes: [
                                 USER.COLUMNS.ID,
                                 USER.COLUMNS.FIRSTNAME,
                                 USER.COLUMNS.LASTNAME,
                                 USER.COLUMNS.USERNAME,
                              ],
                           },
                        ],
                     },
                  ],
               };
            }
            if (association === OPERATIVE_CLIENT.ASSOCIATIONS.RISK_PRODUCT) {
               return {
                  model: RiskProduct,
                  as: association,
                  required: false,
                  include: [
                     {
                        model: Team,
                        as: BALANCE.ASSOCIATIONS.TEAM,
                        required: false,
                     },
                  ],
               };
            }
            if (association === OPERATIVE_CLIENT.ASSOCIATIONS.BALANCE_PRODUCT) {
               return {
                  model: Balance,
                  as: association,
                  required: false,
                  include: [
                     {
                        model: Team,
                        as: BALANCE.ASSOCIATIONS.TEAM,
                        required: false,
                     },
                  ],
               };
            }
            if (association === OPERATIVE_CLIENT.ASSOCIATIONS.PAYMENT_TYPE) {
               return {
                  model: PaymentType,
                  as: association,
                  required: false,
               };
            }
            return undefined;
         })
         .filter((item) => item !== undefined);
   }

   private async getClientModelById(id: number) {
      const client = await OperativeClient.findOne({
         where: { id },
      });
      return client;
   }

   async getOperativeClients(
      attributesIncludes: (keyof IOperativeClient)[],
      includes: (keyof IOperativeClient)[] = [],
      page: number = 1,
      pageSize: number = 10000,
      order: keyof IOperativeClient = 'id',
      orderDesc: 'ASC' | 'DESC' = 'ASC',
      commercialClientId?: number,
      search?: string,
      status?: 'active' | 'suspended',
   ): Promise<{
      rows: Partial<IOperativeClient>[];
      count: number;
   }> {
      const where: WhereOptions<IOperativeClient> = [];
      if (commercialClientId) {
         where.push({ commercial_client_id: commercialClientId });
      }

      if (search) {
         where.push({
            [Op.or]: [
               { fiscal_name: { [Op.like]: `%${search}%` } },
               { fiscal_number: { [Op.like]: `%${search}%` } },
               { activity: { [Op.like]: `%${search}%` } },
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

      const attributes: (keyof IOperativeClient)[] = this.getAllAttributes(attributesIncludes);

      if (attributes.length === 0) {
         throw new Error('No attributes provided for commercial clients');
      }

      const include: Includeable[] = this.getAllAssociations(includes);

      const clients = await OperativeClient.findAndCountAll({
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

   async getOperativeClientById(
      id: number,
      attributesIncludes: (keyof IOperativeClient)[],
      includes: (keyof IOperativeClient)[] = [],
      transaction?: Transaction,
   ): Promise<IOperativeClient> {
      const attributes: (keyof IOperativeClient)[] = Object.values(OPERATIVE_CLIENT.COLUMNS).filter(
         (column) => attributesIncludes.includes(column),
      );

      if (attributes.length === 0) {
         throw new Error('No attributes provided for commercial client');
      }

      const include: Includeable[] = this.getAllAssociations(includes);

      const client = await OperativeClient.findOne({
         where: { id },
         attributes,
         include,
         transaction,
      });

      if (!client) {
         throw new Error(`Operative client with ID ${id} not found`);
      }

      return client.dataValues;
   }

   async createOperativeClient(
      data: IOperativeClientPayload,
      userData: IUser,
      transaction?: Transaction,
   ): Promise<Partial<IOperativeClient>> {
      const { id: userId } = userData;
      const {
         RiskProduct: riskData,
         BalanceProduct: balanceData,
         PymeProduct: pymeData,
         ...clientData
      } = data;
      if (!userId) {
         throw new Error('User ID is required to create an operative client');
      }
      const client = await OperativeClient.create(
         {
            ...clientData,
            created_by: userId,
         },
         { transaction },
      );

      if (!client || !client.dataValues.id) {
         throw new Error('Error creating operative client');
      }

      if (riskData) {
         await RiskProduct.create(
            {
               ...riskData,
               operative_client_id: client.dataValues.id,
            },
            { transaction },
         );
      }
      if (balanceData) {
         await Balance.create(
            {
               ...balanceData,
               operative_client_id: client.dataValues.id,
            },
            { transaction },
         );
      }
      if (pymeData) {
         const {
            DomesticService: domesticData,
            SocialSecurity: socialData,
            ...pymeProductData
         } = pymeData;
         const pymeProduct = await PymeProdUsage.create(
            {
               ...pymeProductData,
               operative_client_id: client.dataValues.id,
            },
            { transaction },
         );

         if (!pymeProduct || !pymeProduct.dataValues.id) {
            throw new Error('Error creating Pyme Product Usage');
         }

         if (domesticData) {
            await DomesticService.create(
               {
                  ...domesticData,
                  user_id: domesticData.user_id,
                  pyme_product_usage_id: pymeProduct.dataValues.id,
               },
               { transaction },
            );
         }

         if (socialData) {
            await SocialSecurity.create(
               {
                  ...socialData,
                  user_id: socialData.user_id,
                  pyme_product_usage_id: pymeProduct.dataValues.id,
               },
               { transaction },
            );
         }
      }
      const response = await this.getOperativeClientById(
         client.dataValues.id,
         [
            OPERATIVE_CLIENT.COLUMNS.ID,
            OPERATIVE_CLIENT.COLUMNS.FISCAL_NAME,
            OPERATIVE_CLIENT.COLUMNS.FISCAL_NUMBER,
         ],
         [],
         transaction,
      );
      if (!response || !response.id) {
         throw new Error('Error retrieving created operative client');
      }
      return response;
   }

   async updateOperativeClient(
      id: number,
      data: IOperativeClientPayload,
      userData: IUser,
      transaction?: Transaction,
   ): Promise<Partial<IOperativeClient>> {
      const { id: userId } = userData;
      if (!userId) {
         throw new Error('User ID is required to update an operative client');
      }
      const client = await this.getClientModelById(id);
      if (!client) {
         throw new Error(`Operative client with ID ${id} not found`);
      }

      const {
         RiskProduct: riskData,
         BalanceProduct: balanceData,
         PymeProduct: pymeData,
         ...clientData
      } = data;

      await client.update(
         {
            ...clientData,
            updated_by: userId,
         },
         { transaction },
      );

      if (riskData) {
         await RiskProduct.upsert(
            {
               ...riskData,
               operative_client_id: id,
            },
            { transaction },
         );
      } else {
         await RiskProduct.destroy({
            where: { operative_client_id: id },
            transaction,
         });
      }

      if (balanceData) {
         await Balance.upsert(
            {
               ...balanceData,
               operative_client_id: id,
            },
            { transaction },
         );
      } else {
         await Balance.destroy({
            where: { operative_client_id: id },
            transaction,
         });
      }

      if (pymeData) {
         const {
            DomesticService: domesticData,
            SocialSecurity: socialData,
            ...pymeProductData
         } = pymeData;
         const [pymeProduct] = await PymeProdUsage.upsert(
            {
               ...pymeProductData,
               operative_client_id: id,
            },
            { returning: true, transaction },
         );

         if (!pymeProduct || !pymeProduct.dataValues.id) {
            throw new Error('Error updating Pyme Product Usage');
         }

         if (domesticData) {
            await DomesticService.upsert(
               {
                  ...domesticData,
                  user_id: domesticData.user_id,
                  pyme_product_usage_id: pymeProduct.dataValues.id,
               },
               { transaction },
            );
         } else {
            await DomesticService.destroy({
               where: { pyme_product_usage_id: pymeProduct.dataValues.id },
               transaction,
            });
         }

         if (socialData) {
            await SocialSecurity.upsert(
               {
                  ...socialData,
                  user_id: socialData.user_id,
                  pyme_product_usage_id: pymeProduct.dataValues.id,
               },
               { transaction },
            );
         } else {
            await SocialSecurity.destroy({
               where: { pyme_product_usage_id: pymeProduct.dataValues.id },
               transaction,
            });
         }
      } else {
         await PymeProdUsage.destroy({
            where: { operative_client_id: id },
            transaction,
         });
      }
      const response = await this.getOperativeClientById(
         id,
         [
            OPERATIVE_CLIENT.COLUMNS.ID,
            OPERATIVE_CLIENT.COLUMNS.FISCAL_NAME,
            OPERATIVE_CLIENT.COLUMNS.FISCAL_NUMBER,
         ],
         [],
         transaction,
      );
      if (!response || !response.id) {
         throw new Error('Error retrieving updated operative client');
      }
      return response;
   }

   async checkOperativeClientExists(
      criteria: Partial<{ id: number; fiscal_number: string }>,
      updateId?: number,
   ): Promise<boolean> {
      const client = await OperativeClient.count({
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

   async suspendCommercialClient(
      id: number,
      suspended_by: number,
      suspended_reason?: string,
   ): Promise<IOperativeClient> {
      const client = await this.getClientModelById(id);
      if (!client) {
         throw new Error(`Commercial client with ID ${id} not found`);
      }
      await client.update({
         suspended_at: new Date(),
         suspended_by,
         suspended_reason,
      });
      return client.dataValues;
   }

   async unsuspendCommercialClient(id: number, unsuspended_by: number): Promise<IOperativeClient> {
      const client = await this.getClientModelById(id);
      if (!client) {
         throw new Error(`Commercial client with ID ${id} not found`);
      }
      await client.update({
         suspended_at: null,
         suspended_by: null,
         suspended_reason: null,
         updated_by: unsuspended_by,
         updated_at: new Date(),
      });
      return client.dataValues;
   }
}

export const operativeClientService = new OperativeClientService();
