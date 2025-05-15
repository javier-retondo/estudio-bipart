import { RiskProduct } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { RISK_PRODUCT } from '../metadata';

class RiskesDeleter extends EntityDeleter {
   model = RiskProduct;
   entityName = RISK_PRODUCT.SINGULAR;
}

export const riskesDeleter = new RiskesDeleter();
