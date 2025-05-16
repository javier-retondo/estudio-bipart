import { IVatCondition } from '../interface';
import { VatCondition } from '../model';
import { VAT_CONDITION } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class VatConditionsPatcher extends EntityPatcher<IVatCondition> {
   model = VatCondition;
   entityName = VAT_CONDITION.SINGULAR;
}

export const vatConditionsPatcher = new VatConditionsPatcher();
