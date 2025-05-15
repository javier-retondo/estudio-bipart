import { PymeProdUsage } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { PYME_PROD_USAGE } from '../metadata';

class PymeProdUsagesDeleter extends EntityDeleter {
   model = PymeProdUsage;
   entityName = PYME_PROD_USAGE.SINGULAR;
}

export const pymeProdUsagesDeleter = new PymeProdUsagesDeleter();
