import { IRiskProduct } from '../interface';
import { RiskProduct } from '../model';
import { RISK_PRODUCT } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class RiskesUpdater extends EntityUpdater<IRiskProduct> {
   model = RiskProduct;
   entityName = RISK_PRODUCT.SINGULAR;
}

export const riskesUpdater = new RiskesUpdater();
