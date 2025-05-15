import { Risk } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { RISK } from '../metadata';

class RiskesDeleter extends EntityDeleter {
   model = Risk;
   entityName = RISK.SINGULAR;
}

export const riskesDeleter = new RiskesDeleter();
