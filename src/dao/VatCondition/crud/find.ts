import {
   IVatCondition,
   IVatConditionAssociations,
   IVatConditionColumnsAliases,
} from '../interface';
import { VatCondition } from '../model';
import { VAT_CONDITION } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { vatConditionIncludes } from '../includes';

class VatConditionsFinder extends EntityFinder<
   IVatCondition,
   IVatConditionAssociations,
   IVatConditionColumnsAliases
> {
   model = VatCondition;
   tableName = VAT_CONDITION.TABLE;
   columns = VAT_CONDITION.COLUMNS;
   associations = vatConditionIncludes;
}
export const vatConditionsFinder = new VatConditionsFinder();
