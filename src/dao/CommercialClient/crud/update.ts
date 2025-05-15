import { ICommercialClient } from '../interface';
import { CommercialClient } from '../model';
import { COMMERCIAL_CLIENT } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class CommercialClientsUpdater extends EntityUpdater<ICommercialClient> {
   model = CommercialClient;
   entityName = COMMERCIAL_CLIENT.SINGULAR;
}

export const commercialClientsUpdater = new CommercialClientsUpdater();
