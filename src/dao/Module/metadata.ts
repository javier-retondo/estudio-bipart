import { IMetadata } from '../../utils/interfaces/general';
import { IModuleAssociations, IModuleColumnsAliases } from './interface';

export const MODULE: IMetadata<IModuleColumnsAliases, IModuleAssociations> = {
   TABLE: 'module',
   COLUMNS: {
      ID: 'id',
      MODULE_NAME: 'module_name',
   },
   PLURAL: 'Modules',
   SINGULAR: 'Module',
   ASSOCIATIONS: {},
};
