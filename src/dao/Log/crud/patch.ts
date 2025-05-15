import { ILog } from '../interface';
import { Log } from '../model';
import { LOG } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class LogsPatcher extends EntityPatcher<ILog> {
   model = Log;
   entityName = LOG.SINGULAR;
}

export const logsPatcher = new LogsPatcher();
