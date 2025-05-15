import {
   IOperativeClient,
   IOperativeClientAssociations,
   IOperativeClientColumnsAliases,
} from '../interface';
import { OperativeClient } from '../model';
import { OPERATIVE_CLIENT } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { operativeClientIncludes } from '../includes';

class OperativeClientsFinder extends EntityFinder<
   IOperativeClient,
   IOperativeClientAssociations,
   IOperativeClientColumnsAliases
> {
   model = OperativeClient;
   tableName = OPERATIVE_CLIENT.TABLE;
   columns = OPERATIVE_CLIENT.COLUMNS;
   associations = operativeClientIncludes;
}
export const operativeClientsFinder = new OperativeClientsFinder();
