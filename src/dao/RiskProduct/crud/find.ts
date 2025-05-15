import { IRiskProduct, IRiskProductAssociations, IRiskProductColumnsAliases } from '../interface';
import { RiskProduct } from '../model';
import { RISK_PRODUCT } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { riskIncludes } from '../includes';

class RiskesFinder extends EntityFinder<
   IRiskProduct,
   IRiskProductAssociations,
   IRiskProductColumnsAliases
> {
   model = RiskProduct;
   tableName = RISK_PRODUCT.TABLE;
   columns = RISK_PRODUCT.COLUMNS;
   associations = riskIncludes;
}
export const riskesFinder = new RiskesFinder();
