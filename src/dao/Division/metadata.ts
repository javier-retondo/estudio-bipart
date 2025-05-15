import { IMetadata } from '../../utils/interfaces/general';
import { IDivisionAssociations, IDivisionColumnsAliases } from './interface';

export const DIVISION: IMetadata<IDivisionColumnsAliases, IDivisionAssociations> = {
   TABLE: 'division',
   COLUMNS: {
      ID: 'id',
      DIVISION_NAME: 'division_name',
      CREATED_AT: 'created_at',
      UPDATED_AT: 'updated_at',
      DELETED_AT: 'deleted_at',
      CREATED_BY: 'created_by',
      UPDATED_BY: 'updated_by',
      DELETED_BY: 'deleted_by',
   },
   PLURAL: 'Divisions',
   SINGULAR: 'Division',
   ASSOCIATIONS: {},
};
