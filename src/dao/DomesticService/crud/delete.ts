import { DomesticService } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { DOMESTIC_SERVICE } from '../metadata';

class DomesticServicesDeleter extends EntityDeleter {
   model = DomesticService;
   entityName = DOMESTIC_SERVICE.SINGULAR;
}

export const domesticServicesDeleter = new DomesticServicesDeleter();
