import { VatCondition } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { VAT_CONDITION } from '../metadata';

class VatConditionsDeleter extends EntityDeleter {
   model = VatCondition;
   entityName = VAT_CONDITION.SINGULAR;
}

export const vatConditionsDeleter = new VatConditionsDeleter();
