import { PymeProduct } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { PYME_PRODUCT } from '../metadata';

class PymeProductsDeleter extends EntityDeleter {
   model = PymeProduct;
   entityName = PYME_PRODUCT.SINGULAR;
}

export const pymeProductsDeleter = new PymeProductsDeleter();
