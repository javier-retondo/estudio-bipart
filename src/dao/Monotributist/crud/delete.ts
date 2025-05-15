import { Monotributist } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { MONOTRIBUTIST } from '../metadata';

class MonotributistsDeleter extends EntityDeleter {
   model = Monotributist;
   entityName = MONOTRIBUTIST.SINGULAR;
}

export const monotributistsDeleter = new MonotributistsDeleter();
