import { OperativeClient } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { OPERATIVE_CLIENT } from '../metadata';

class OperativeClientsDeleter extends EntityDeleter {
   model = OperativeClient;
   entityName = OPERATIVE_CLIENT.SINGULAR;
}

export const operativeClientsDeleter = new OperativeClientsDeleter();
