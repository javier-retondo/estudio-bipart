import { IDivision } from '../interface';
import { Division } from '../model';
import { DIVISION } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class DivisionsUpdater extends EntityUpdater<IDivision> {
   model = Division;
   entityName = DIVISION.SINGULAR;
}

export const divisionsUpdater = new DivisionsUpdater();
