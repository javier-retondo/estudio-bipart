import { IRisk } from '../interface';
import { Risk } from '../model';
import { RISK } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class RiskesUpdater extends EntityUpdater<IRisk> {
   model = Risk;
   entityName = RISK.SINGULAR;
}

export const riskesUpdater = new RiskesUpdater();
