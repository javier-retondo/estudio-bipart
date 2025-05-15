import { IDomesticService } from '../interface';
import { DomesticService } from '../model';
import { DOMESTIC_SERVICE } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class DomesticServicesUpdater extends EntityUpdater<IDomesticService> {
   model = DomesticService;
   entityName = DOMESTIC_SERVICE.SINGULAR;
}

export const domesticServicesUpdater = new DomesticServicesUpdater();
