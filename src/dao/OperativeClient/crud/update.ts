import { IOperativeClient } from '../interface';
import { OperativeClient } from '../model';
import { OPERATIVE_CLIENT } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class OperativeClientsUpdater extends EntityUpdater<IOperativeClient> {
   model = OperativeClient;
   entityName = OPERATIVE_CLIENT.SINGULAR;
}

export const operativeClientsUpdater = new OperativeClientsUpdater();
