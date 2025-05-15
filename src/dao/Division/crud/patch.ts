import { IDivision } from '../interface';
import { Division } from '../model';
import { DIVISION } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class DivisionsPatcher extends EntityPatcher<IDivision> {
   model = Division;
   entityName = DIVISION.SINGULAR;
}

export const divisionsPatcher = new DivisionsPatcher();
