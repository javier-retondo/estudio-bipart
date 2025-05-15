import { IPymeProdUsage } from '../interface';
import { PymeProdUsage } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { PYME_PROD_USAGE } from '../metadata';

class PymeProdUsagesCreator extends EntityCreator<IPymeProdUsage> {
   model = PymeProdUsage;
   entityName = PYME_PROD_USAGE.SINGULAR;
}

export const pymeProdUsagesCreator = new PymeProdUsagesCreator();
