import { IMetadata } from '../../utils/interfaces/general';
import { IPymeProdUsageAssociations, IPymeProdUsageColumnsAliases } from './interface';

export const PYME_PROD_USAGE: IMetadata<IPymeProdUsageColumnsAliases, IPymeProdUsageAssociations> =
   {
      TABLE: 'pyme_product_usage',
      COLUMNS: {
         ID: 'id',
         OPERATIVE_CLIENT_ID: 'operative_client_id',
         PYME_PRODUCT_ID: 'pyme_product_id',
         TEAM_ID: 'team_id',
         DIVISION_ID: 'division_id',
         GROSS_INCOME_ID: 'gross_income_id',
         MONOTRIBUTIST_ID: 'monotributist_id',
         USER_ID: 'user_id',
         DOMESTIC_SERVICE_ID: 'domestic_service_id',
         BALANCE_PRODUCT_ID: 'balance_product_id',
      },
      PLURAL: 'PymeProdUsages',
      SINGULAR: 'PymeProdUsage',
      ASSOCIATIONS: {
         USER: 'User',
         PYME_PRODUCT: 'PymeProduct',
         TEAM: 'Team',
         DIVISION: 'Division',
         GROSS_INCOME: 'GrossIncome',
         MONOTRIBUTIST: 'Monotributist',
         DOMESTIC_SERVICE: 'DomesticService',
         BALANCE_PRODUCT: 'BalanceProduct',
      },
   };
