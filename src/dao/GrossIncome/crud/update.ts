import { IGrossIncome } from '../interface';
import { GrossIncome } from '../model';
import { GROSS_INCOME } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class GrossIncomesUpdater extends EntityUpdater<IGrossIncome> {
   model = GrossIncome;
   entityName = GROSS_INCOME.SINGULAR;
}

export const grossIncomesUpdater = new GrossIncomesUpdater();
