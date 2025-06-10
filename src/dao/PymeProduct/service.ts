import { IUser } from '../interfaces';
import { IPymeProduct } from './interface';
import { PymeProduct } from './model';

class PymeProductService {
   async getPymeProductById(id: number): Promise<IPymeProduct> {
      const pymeProduct = await PymeProduct.findByPk(id).then(
         (pymeProduct) => pymeProduct?.dataValues,
      );
      if (!pymeProduct) {
         throw new Error(`PymeProduct with id ${id} not found`);
      }
      return pymeProduct;
   }

   async createPymeProduct(
      pymeProductData: Omit<IPymeProduct, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
   ): Promise<IPymeProduct> {
      const newPymeProduct = await PymeProduct.create({
         ...pymeProductData,
         created_at: new Date(),
         updated_at: null,
         deleted_at: null,
      });
      return newPymeProduct.dataValues;
   }

   async getPymeProducts(): Promise<IPymeProduct[]> {
      const pymeProducts = await PymeProduct.findAll({
         where: { deleted_at: null },
         order: [['created_at', 'DESC']],
      });
      return pymeProducts.map((pymeProduct) => pymeProduct.dataValues);
   }

   async updatePymeProduct(
      id: number,
      pymeProductData: Partial<Omit<IPymeProduct, 'id' | 'created_at' | 'deleted_at'>>,
   ): Promise<IPymeProduct> {
      const pymeProduct = await PymeProduct.findByPk(id);
      if (!pymeProduct) {
         throw new Error(`PymeProduct with id ${id} not found`);
      }
      const updatedPymeProduct = await pymeProduct.update({
         ...pymeProductData,
         updated_at: new Date(),
         updated_by: pymeProductData.updated_by ?? pymeProduct.dataValues.updated_by,
      });
      return updatedPymeProduct.dataValues;
   }

   async deletePymeProduct(id: number, userData: IUser): Promise<string> {
      const pymeProduct = await PymeProduct.findByPk(id);
      if (!pymeProduct) {
         throw new Error(`PymeProduct with id ${id} not found`);
      }
      await pymeProduct.update({
         deleted_at: new Date(),
         updated_at: new Date(),
         deleted_by: userData.id,
         updated_by: userData.id,
      });

      return `PymeProduct with id ${id} deleted successfully`;
   }
}

export const pymeProductService = new PymeProductService();
