import { IRiskProduct } from '../interface';
import { RiskProduct } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { RISK_PRODUCT } from '../metadata';

class RiskesCreator extends EntityCreator<IRiskProduct> {
   model = RiskProduct;
   entityName = RISK_PRODUCT.SINGULAR;
}

export const riskesCreator = new RiskesCreator();
