import { IDivision } from '../interface';
import { Division } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { DIVISION } from '../metadata';

class DivisionsCreator extends EntityCreator<IDivision> {
   model = Division;
   entityName = DIVISION.SINGULAR;
}

export const divisionsCreator = new DivisionsCreator();
