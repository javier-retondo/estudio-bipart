import { IMonotributist } from '../interface';
import { Monotributist } from '../model';
import { MONOTRIBUTIST } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class MonotributistsUpdater extends EntityUpdater<IMonotributist> {
   model = Monotributist;
   entityName = MONOTRIBUTIST.SINGULAR;
}

export const monotributistsUpdater = new MonotributistsUpdater();
