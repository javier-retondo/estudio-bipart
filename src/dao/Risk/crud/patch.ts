import { IRisk } from '../interface';
import { Risk } from '../model';
import { RISK } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class RiskesPatcher extends EntityPatcher<IRisk> {
   model = Risk;
   entityName = RISK.SINGULAR;
}

export const riskesPatcher = new RiskesPatcher();
