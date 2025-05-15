import { IRiskProduct } from '../interface';
import { RiskProduct } from '../model';
import { RISK_PRODUCT } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class RiskesPatcher extends EntityPatcher<IRiskProduct> {
   model = RiskProduct;
   entityName = RISK_PRODUCT.SINGULAR;
}

export const riskesPatcher = new RiskesPatcher();
