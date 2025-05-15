import { IGrossIncome } from '../interface';
import { GrossIncome } from '../model';
import { GROSS_INCOME } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class GrossIncomesPatcher extends EntityPatcher<IGrossIncome> {
   model = GrossIncome;
   entityName = GROSS_INCOME.SINGULAR;
}

export const grossIncomesPatcher = new GrossIncomesPatcher();
