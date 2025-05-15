import { IPymeProduct } from '../interface';
import { PymeProduct } from '../model';
import { PYME_PRODUCT } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class PymeProductsUpdater extends EntityUpdater<IPymeProduct> {
   model = PymeProduct;
   entityName = PYME_PRODUCT.SINGULAR;
}

export const pymeProductsUpdater = new PymeProductsUpdater();
