import { ILog } from '../interface';
import { Log } from '../model';
import { LOG } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class LogsUpdater extends EntityUpdater<ILog> {
   model = Log;
   entityName = LOG.SINGULAR;
}

export const logsUpdater = new LogsUpdater();
