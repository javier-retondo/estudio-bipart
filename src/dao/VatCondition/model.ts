import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { VAT_CONDITION } from './metadata';
import { IVatCondition } from './interface';

type VatConditionCreationAttributes = Optional<IVatCondition, 'id'>;

class VatCondition extends Model<IVatCondition, VatConditionCreationAttributes> {}

VatCondition.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      description: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
   },
   {
      sequelize: sequelize,
      tableName: VAT_CONDITION.TABLE,
      timestamps: false,
      modelName: VAT_CONDITION.TABLE,
      name: {
         plural: VAT_CONDITION.PLURAL,
         singular: VAT_CONDITION.SINGULAR,
      },
   },
);

export { VatCondition };
