import { IRisk } from '../interface';
import { Risk } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { RISK } from '../metadata';

class RiskesCreator extends EntityCreator<IRisk> {
   model = Risk;
   entityName = RISK.SINGULAR;
}

export const riskesCreator = new RiskesCreator();
