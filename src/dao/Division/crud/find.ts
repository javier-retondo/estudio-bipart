import { IDivision, IDivisionAssociations, IDivisionColumnsAliases } from '../interface';
import { Division } from '../model';
import { DIVISION } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { divisionIncludes } from '../includes';

class DivisionsFinder extends EntityFinder<
   IDivision,
   IDivisionAssociations,
   IDivisionColumnsAliases
> {
   model = Division;
   tableName = DIVISION.TABLE;
   columns = DIVISION.COLUMNS;
   associations = divisionIncludes;
}
export const divisionsFinder = new DivisionsFinder();
