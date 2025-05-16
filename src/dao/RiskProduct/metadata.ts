import { IMetadata } from '../../utils/interfaces/general';
import { IRiskProductAssociations, IRiskProductColumnsAliases } from './interface';

export const RISK_PRODUCT: IMetadata<IRiskProductColumnsAliases, IRiskProductAssociations> = {
   TABLE: 'risk_product',
   COLUMNS: { ID: 'id', OPERATIVE_CLIENT_ID: 'operative_client_id', TEAM_ID: 'team_id' },
   PLURAL: 'RiskProducts',
   SINGULAR: 'RiskProduct',
   ASSOCIATIONS: {
      TEAM: 'Team',
   },
};
