import {
   IDomesticService,
   IDomesticServiceAssociations,
   IDomesticServiceColumnsAliases,
} from '../interface';
import { DomesticService } from '../model';
import { DOMESTIC_SERVICE } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { domesticServiceIncludes } from '../includes';

class DomesticServicesFinder extends EntityFinder<
   IDomesticService,
   IDomesticServiceAssociations,
   IDomesticServiceColumnsAliases
> {
   model = DomesticService;
   tableName = DOMESTIC_SERVICE.TABLE;
   columns = DOMESTIC_SERVICE.COLUMNS;
   associations = domesticServiceIncludes;
}
export const domesticServicesFinder = new DomesticServicesFinder();
