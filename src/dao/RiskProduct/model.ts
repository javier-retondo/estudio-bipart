import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { RISK_PRODUCT } from './metadata';
import { IRiskProduct } from './interface';

type RiskCreationAttributes = Optional<IRiskProduct, 'id'>;

class RiskProduct extends Model<IRiskProduct, RiskCreationAttributes> {}

RiskProduct.init(
   {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      operative_client_id: { type: DataTypes.INTEGER, allowNull: false },
      team_id: { type: DataTypes.INTEGER, allowNull: false },
   },
   {
      sequelize: sequelize,
      tableName: RISK_PRODUCT.TABLE,
      timestamps: false,
      modelName: RISK_PRODUCT.TABLE,
      name: { plural: RISK_PRODUCT.PLURAL, singular: RISK_PRODUCT.SINGULAR },
   },
);

export { RiskProduct };
