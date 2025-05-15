import { GrossIncome } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { GROSS_INCOME } from '../metadata';

class GrossIncomesDeleter extends EntityDeleter {
   model = GrossIncome;
   entityName = GROSS_INCOME.SINGULAR;
}

export const grossIncomesDeleter = new GrossIncomesDeleter();
