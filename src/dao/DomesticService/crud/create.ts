import { IDomesticService } from '../interface';
import { DomesticService } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { DOMESTIC_SERVICE } from '../metadata';

class DomesticServicesCreator extends EntityCreator<IDomesticService> {
   model = DomesticService;
   entityName = DOMESTIC_SERVICE.SINGULAR;
}

export const domesticServicesCreator = new DomesticServicesCreator();
