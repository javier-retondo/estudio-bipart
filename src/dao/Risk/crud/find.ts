import { IRisk, IRiskAssociations, IRiskColumnsAliases } from '../interface';
import { Risk } from '../model';
import { RISK } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { riskIncludes } from '../includes';

class RiskesFinder extends EntityFinder<IRisk, IRiskAssociations, IRiskColumnsAliases> {
   model = Risk;
   tableName = RISK.TABLE;
   columns = RISK.COLUMNS;
   associations = riskIncludes;
}
export const riskesFinder = new RiskesFinder();
