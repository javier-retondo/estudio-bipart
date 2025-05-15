import { IMetadata } from '../../utils/interfaces/general';
import { IRiskAssociations, IRiskColumnsAliases } from './interface';

export const RISK: IMetadata<IRiskColumnsAliases, IRiskAssociations> = {
   TABLE: 'risk',
   COLUMNS: {
      ID: 'id',
      OPERATIVE_CLIENT_ID: 'operative_client_id',
      TEAM_ID: 'team_id',
   },
   PLURAL: 'Riskes',
   SINGULAR: 'Risk',
   ASSOCIATIONS: {},
};
