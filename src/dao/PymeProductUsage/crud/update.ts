import { IPymeProdUsage } from '../interface';
import { PymeProdUsage } from '../model';
import { PYME_PROD_USAGE } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class PymeProdUsagesUpdater extends EntityUpdater<IPymeProdUsage> {
   model = PymeProdUsage;
   entityName = PYME_PROD_USAGE.SINGULAR;
}

export const pymeProdUsagesUpdater = new PymeProdUsagesUpdater();
