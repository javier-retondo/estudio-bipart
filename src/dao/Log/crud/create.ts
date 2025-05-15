import { ILog } from '../interface';
import { Log } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { LOG } from '../metadata';

class LogsCreator extends EntityCreator<ILog> {
   model = Log;
   entityName = LOG.SINGULAR;
}

export const logsCreator = new LogsCreator();
