import { IMetadata } from '../../utils/interfaces/general';
import { IVatConditionAssociations, IVatConditionColumnsAliases } from './interface';

export const VAT_CONDITION: IMetadata<IVatConditionColumnsAliases, IVatConditionAssociations> = {
   TABLE: 'vat_condition',
   COLUMNS: {
      ID: 'id',
      DESCRIPTION: 'description',
   },
   PLURAL: 'VatConditions',
   SINGULAR: 'VatCondition',
   ASSOCIATIONS: {},
};
