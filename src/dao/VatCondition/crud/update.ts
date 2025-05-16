import { IVatCondition } from '../interface';
import { VatCondition } from '../model';
import { VAT_CONDITION } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class VatConditionsUpdater extends EntityUpdater<IVatCondition> {
   model = VatCondition;
   entityName = VAT_CONDITION.SINGULAR;
}

export const vatConditionsUpdater = new VatConditionsUpdater();
