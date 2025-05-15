import {
   IPymeProdUsage,
   IPymeProdUsageAssociations,
   IPymeProdUsageColumnsAliases,
} from '../interface';
import { PymeProdUsage } from '../model';
import { PYME_PROD_USAGE } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { pymeProdUsageIncludes } from '../includes';

class PymeProdUsagesFinder extends EntityFinder<
   IPymeProdUsage,
   IPymeProdUsageAssociations,
   IPymeProdUsageColumnsAliases
> {
   model = PymeProdUsage;
   tableName = PYME_PROD_USAGE.TABLE;
   columns = PYME_PROD_USAGE.COLUMNS;
   associations = pymeProdUsageIncludes;
}
export const pymeProdUsagesFinder = new PymeProdUsagesFinder();
