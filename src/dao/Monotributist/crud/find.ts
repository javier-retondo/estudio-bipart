import {
   IMonotributist,
   IMonotributistAssociations,
   IMonotributistColumnsAliases,
} from '../interface';
import { Monotributist } from '../model';
import { MONOTRIBUTIST } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { monotributistIncludes } from '../includes';

class MonotributistsFinder extends EntityFinder<
   IMonotributist,
   IMonotributistAssociations,
   IMonotributistColumnsAliases
> {
   model = Monotributist;
   tableName = MONOTRIBUTIST.TABLE;
   columns = MONOTRIBUTIST.COLUMNS;
   associations = monotributistIncludes;
}
export const monotributistsFinder = new MonotributistsFinder();
