import { IUser } from '../interfaces';
import { IPaymentType } from './interface';
import { PaymentType } from './model';

class PaymentTypeService {
   async getPaymentTypeById(id: number): Promise<IPaymentType> {
      const paymentType = await PaymentType.findByPk(id).then(
         (paymentType) => paymentType?.dataValues,
      );
      if (!paymentType) {
         throw new Error(`PaymentType with id ${id} not found`);
      }
      return paymentType;
   }

   async createPaymentType(
      paymentTypeData: Omit<IPaymentType, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
   ): Promise<IPaymentType> {
      const newPaymentType = await PaymentType.create({
         ...paymentTypeData,
         created_at: new Date(),
         updated_at: null,
         deleted_at: null,
      });
      return newPaymentType.dataValues;
   }

   async getPaymentTypes(): Promise<IPaymentType[]> {
      const paymentTypes = await PaymentType.findAll({
         where: { deleted_at: null },
         order: [['created_at', 'DESC']],
      });
      return paymentTypes.map((paymentType) => paymentType.dataValues);
   }

   async updatePaymentType(
      id: number,
      paymentTypeData: Partial<Omit<IPaymentType, 'id' | 'created_at' | 'deleted_at'>>,
   ): Promise<IPaymentType> {
      const paymentType = await PaymentType.findByPk(id);
      if (!paymentType) {
         throw new Error(`PaymentType with id ${id} not found`);
      }
      const updatedPaymentType = await paymentType.update({
         ...paymentTypeData,
         updated_at: new Date(),
         updated_by: paymentTypeData.updated_by ?? paymentType.dataValues.updated_by,
      });
      return updatedPaymentType.dataValues;
   }

   async deletePaymentType(id: number, userData: IUser): Promise<string> {
      const paymentType = await PaymentType.findByPk(id);
      if (!paymentType) {
         throw new Error(`PaymentType with id ${id} not found`);
      }
      await paymentType.update({
         deleted_at: new Date(),
         updated_at: new Date(),
         deleted_by: userData.id,
         updated_by: userData.id,
      });

      return `PaymentType with id ${id} deleted successfully`;
   }
}

export const paymentTypeService = new PaymentTypeService();
