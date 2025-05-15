import { IGrossIncome } from '../interface';
import { GrossIncome } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { GROSS_INCOME } from '../metadata';

class GrossIncomesCreator extends EntityCreator<IGrossIncome> {
   model = GrossIncome;
   entityName = GROSS_INCOME.SINGULAR;
}

export const grossIncomesCreator = new GrossIncomesCreator();
