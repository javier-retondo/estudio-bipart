import { IOperativeClient } from '../interface';
import { OperativeClient } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { OPERATIVE_CLIENT } from '../metadata';

class OperativeClientsCreator extends EntityCreator<IOperativeClient> {
   model = OperativeClient;
   entityName = OPERATIVE_CLIENT.SINGULAR;
}

export const operativeClientsCreator = new OperativeClientsCreator();
