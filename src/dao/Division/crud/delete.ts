import { Division } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { DIVISION } from '../metadata';

class DivisionsDeleter extends EntityDeleter {
   model = Division;
   entityName = DIVISION.SINGULAR;
}

export const divisionsDeleter = new DivisionsDeleter();
