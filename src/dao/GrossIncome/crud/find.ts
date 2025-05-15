import { IGrossIncome, IGrossIncomeAssociations, IGrossIncomeColumnsAliases } from '../interface';
import { GrossIncome } from '../model';
import { GROSS_INCOME } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { grossIncomeIncludes } from '../includes';

class GrossIncomesFinder extends EntityFinder<
   IGrossIncome,
   IGrossIncomeAssociations,
   IGrossIncomeColumnsAliases
> {
   model = GrossIncome;
   tableName = GROSS_INCOME.TABLE;
   columns = GROSS_INCOME.COLUMNS;
   associations = grossIncomeIncludes;
}
export const grossIncomesFinder = new GrossIncomesFinder();
