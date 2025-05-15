import {
   ICommercialClient,
   ICommercialClientAssociations,
   ICommercialClientColumnsAliases,
} from '../interface';
import { CommercialClient } from '../model';
import { COMMERCIAL_CLIENT } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { commercialClientIncludes } from '../includes';

class CommercialClientsFinder extends EntityFinder<
   ICommercialClient,
   ICommercialClientAssociations,
   ICommercialClientColumnsAliases
> {
   model = CommercialClient;
   tableName = COMMERCIAL_CLIENT.TABLE;
   columns = COMMERCIAL_CLIENT.COLUMNS;
   associations = commercialClientIncludes;
}
export const commercialClientsFinder = new CommercialClientsFinder();
