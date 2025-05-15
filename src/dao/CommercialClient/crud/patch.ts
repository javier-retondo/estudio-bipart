import { ICommercialClient } from '../interface';
import { CommercialClient } from '../model';
import { COMMERCIAL_CLIENT } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class CommercialClientsPatcher extends EntityPatcher<ICommercialClient> {
   model = CommercialClient;
   entityName = COMMERCIAL_CLIENT.SINGULAR;
}

export const commercialClientsPatcher = new CommercialClientsPatcher();
