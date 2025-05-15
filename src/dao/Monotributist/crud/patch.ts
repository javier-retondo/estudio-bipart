import { IMonotributist } from '../interface';
import { Monotributist } from '../model';
import { MONOTRIBUTIST } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class MonotributistsPatcher extends EntityPatcher<IMonotributist> {
   model = Monotributist;
   entityName = MONOTRIBUTIST.SINGULAR;
}

export const monotributistsPatcher = new MonotributistsPatcher();
