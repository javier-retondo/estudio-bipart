import { ICommercialClient } from '../interface';
import { CommercialClient } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { COMMERCIAL_CLIENT } from '../metadata';

class CommercialClientsCreator extends EntityCreator<ICommercialClient> {
   model = CommercialClient;
   entityName = COMMERCIAL_CLIENT.SINGULAR;
}

export const commercialClientsCreator = new CommercialClientsCreator();
