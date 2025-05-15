import { IMonotributist } from '../interface';
import { Monotributist } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { MONOTRIBUTIST } from '../metadata';

class MonotributistsCreator extends EntityCreator<IMonotributist> {
   model = Monotributist;
   entityName = MONOTRIBUTIST.SINGULAR;
}

export const monotributistsCreator = new MonotributistsCreator();
