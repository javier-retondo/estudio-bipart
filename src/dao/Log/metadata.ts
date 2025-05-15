import { IMetadata } from '../../utils/interfaces/general';
import { ILogAssociations, ILogColumnsAliases } from './interface';

export const LOG: IMetadata<ILogColumnsAliases, ILogAssociations> = {
   TABLE: 'log',
   COLUMNS: {
      ID: 'id',
      DATE_TIME: 'date_time',
      USER_ID: 'user_id',
      TYPE: 'type',
      DESCRIPTION: 'description',
   },
   PLURAL: 'Logs',
   SINGULAR: 'Log',
   ASSOCIATIONS: {},
};
