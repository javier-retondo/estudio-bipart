import { IDomesticService } from '../interface';
import { DomesticService } from '../model';
import { DOMESTIC_SERVICE } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class DomesticServicesPatcher extends EntityPatcher<IDomesticService> {
   model = DomesticService;
   entityName = DOMESTIC_SERVICE.SINGULAR;
}

export const domesticServicesPatcher = new DomesticServicesPatcher();
