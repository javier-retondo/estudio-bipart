import { IMetadata } from '../../utils/interfaces/general';
import { IBalanceAssociations, IBalanceColumnsAliases } from './interface';

export const BALANCE: IMetadata<IBalanceColumnsAliases, IBalanceAssociations> = {
   TABLE: 'balance',
   COLUMNS: {
      ID: 'id',
      TEAM_ID: 'team_id',
      MONTH_NUMBER: 'month_number',
      OPERATIVE_CLIENT_ID: 'operative_client_id',
   },
   PLURAL: 'Balances',
   SINGULAR: 'Balance',
   ASSOCIATIONS: {
      TEAM: 'Team',
   },
};
