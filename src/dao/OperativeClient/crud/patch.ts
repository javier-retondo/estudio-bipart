import { IOperativeClient } from '../interface';
import { OperativeClient } from '../model';
import { OPERATIVE_CLIENT } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class OperativeClientsPatcher extends EntityPatcher<IOperativeClient> {
   model = OperativeClient;
   entityName = OPERATIVE_CLIENT.SINGULAR;
}

export const operativeClientsPatcher = new OperativeClientsPatcher();
