import { IPymeProduct } from '../interface';
import { PymeProduct } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { PYME_PRODUCT } from '../metadata';

class PymeProductsCreator extends EntityCreator<IPymeProduct> {
   model = PymeProduct;
   entityName = PYME_PRODUCT.SINGULAR;
}

export const pymeProductsCreator = new PymeProductsCreator();
