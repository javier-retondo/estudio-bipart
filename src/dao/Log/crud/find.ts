import { ILog, ILogAssociations, ILogColumnsAliases } from '../interface';
import { Log } from '../model';
import { LOG } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { logIncludes } from '../includes';

class LogsFinder extends EntityFinder<ILog, ILogAssociations, ILogColumnsAliases> {
   model = Log;
   tableName = LOG.TABLE;
   columns = LOG.COLUMNS;
   associations = logIncludes;
}
export const logsFinder = new LogsFinder();
