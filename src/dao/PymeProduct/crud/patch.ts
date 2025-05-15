import { IPymeProduct } from '../interface';
import { PymeProduct } from '../model';
import { PYME_PRODUCT } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class PymeProductsPatcher extends EntityPatcher<IPymeProduct> {
   model = PymeProduct;
   entityName = PYME_PRODUCT.SINGULAR;
}

export const pymeProductsPatcher = new PymeProductsPatcher();
