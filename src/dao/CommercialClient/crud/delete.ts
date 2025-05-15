import { CommercialClient } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { COMMERCIAL_CLIENT } from '../metadata';

class CommercialClientsDeleter extends EntityDeleter {
   model = CommercialClient;
   entityName = COMMERCIAL_CLIENT.SINGULAR;
}

export const commercialClientsDeleter = new CommercialClientsDeleter();
