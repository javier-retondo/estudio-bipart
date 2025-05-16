import { IVatCondition } from '../interface';
import { VatCondition } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { VAT_CONDITION } from '../metadata';

class VatConditionsCreator extends EntityCreator<IVatCondition> {
   model = VatCondition;
   entityName = VAT_CONDITION.SINGULAR;
}

export const vatConditionsCreator = new VatConditionsCreator();
