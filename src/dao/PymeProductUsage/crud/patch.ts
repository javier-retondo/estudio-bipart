import { IPymeProdUsage } from '../interface';
import { PymeProdUsage } from '../model';
import { PYME_PROD_USAGE } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class PymeProdUsagesPatcher extends EntityPatcher<IPymeProdUsage> {
   model = PymeProdUsage;
   entityName = PYME_PROD_USAGE.SINGULAR;
}

export const pymeProdUsagesPatcher = new PymeProdUsagesPatcher();
