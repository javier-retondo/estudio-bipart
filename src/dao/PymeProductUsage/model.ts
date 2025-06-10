import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { PYME_PROD_USAGE } from './metadata';
import { IPymeProdUsage } from './interface';

type PymeProdUsageCreationAttributes = Optional<IPymeProdUsage, 'id'>;

class PymeProdUsage extends Model<IPymeProdUsage, PymeProdUsageCreationAttributes> {}

PymeProdUsage.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      operative_client_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      pyme_product_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      team_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      division_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      gross_income_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      monotributist_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      domestic_service_id: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      balance_product_id: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
   },
   {
      sequelize: sequelize,
      tableName: PYME_PROD_USAGE.TABLE,
      timestamps: false,
      modelName: PYME_PROD_USAGE.TABLE,
      name: {
         plural: PYME_PROD_USAGE.PLURAL,
         singular: PYME_PROD_USAGE.SINGULAR,
      },
   },
);

export { PymeProdUsage };
