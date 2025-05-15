import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { BALANCE } from './metadata';
import { IBalance } from './interface';

type BalanceCreationAttributes = Optional<IBalance, 'id'>;

class Balance extends Model<IBalance, BalanceCreationAttributes> {}

Balance.init(
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
      team_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      month_number: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   },
   {
      sequelize: sequelize,
      tableName: BALANCE.TABLE,
      timestamps: false,
      modelName: BALANCE.TABLE,
      name: {
         plural: BALANCE.PLURAL,
         singular: BALANCE.SINGULAR,
      },
   },
);

export { Balance };
