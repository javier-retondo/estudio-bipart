import { Log } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { LOG } from '../metadata';

class LogsDeleter extends EntityDeleter {
   model = Log;
   entityName = LOG.SINGULAR;
}

export const logsDeleter = new LogsDeleter();
