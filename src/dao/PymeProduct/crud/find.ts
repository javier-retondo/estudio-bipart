import { IPymeProduct, IPymeProductAssociations, IPymeProductColumnsAliases } from '../interface';
import { PymeProduct } from '../model';
import { PYME_PRODUCT } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { pymeProductIncludes } from '../includes';

class PymeProductsFinder extends EntityFinder<
   IPymeProduct,
   IPymeProductAssociations,
   IPymeProductColumnsAliases
> {
   model = PymeProduct;
   tableName = PYME_PRODUCT.TABLE;
   columns = PYME_PRODUCT.COLUMNS;
   associations = pymeProductIncludes;
}
export const pymeProductsFinder = new PymeProductsFinder();
