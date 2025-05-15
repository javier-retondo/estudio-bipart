import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { RISK } from './metadata';
import { IRisk } from './interface';

type RiskCreationAttributes = Optional<IRisk, 'id'>;

class Risk extends Model<IRisk, RiskCreationAttributes> {}

Risk.init(
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
   },
   {
      sequelize: sequelize,
      tableName: RISK.TABLE,
      timestamps: false,
      modelName: RISK.TABLE,
      name: {
         plural: RISK.PLURAL,
         singular: RISK.SINGULAR,
      },
   },
);

export { Risk };
