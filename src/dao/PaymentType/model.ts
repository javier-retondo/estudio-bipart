import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { PAYMENT_TYPE } from './metadata';
import { IPaymentType } from './interface';

type PaymentTypeCreationAttributes = Optional<IPaymentType, 'id'>;

class AllPaymentType extends Model<IPaymentType, PaymentTypeCreationAttributes> {}

AllPaymentType.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING(150),
         allowNull: false,
      },
      description: {
         type: DataTypes.STRING(255),
         allowNull: true,
      },
      created_at: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW,
      },
      updated_at: {
         type: DataTypes.DATE,
         allowNull: true,
      },
      deleted_at: {
         type: DataTypes.DATE,
         allowNull: true,
      },
      created_by: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      updated_by: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      deleted_by: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      suspended_at: {
         type: DataTypes.DATE,
         allowNull: true,
      },
      suspended_by: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      suspended_reason: {
         type: DataTypes.STRING(255),
         allowNull: true,
      },
   },
   {
      sequelize: sequelize,
      tableName: PAYMENT_TYPE.TABLE,
      timestamps: false,
      modelName: PAYMENT_TYPE.TABLE,
      name: {
         plural: PAYMENT_TYPE.PLURAL,
         singular: PAYMENT_TYPE.SINGULAR,
      },
      scopes: { notDeleted: { where: [{ deleted_at: null }] } },
   },
);

const PaymentType = AllPaymentType.scope('notDeleted');

export { PaymentType, AllPaymentType };
