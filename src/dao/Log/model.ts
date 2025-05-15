import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { LOG } from './metadata';
import { ILog } from './interface';

type LogCreationAttributes = Optional<ILog, 'id'>;

class Log extends Model<ILog, LogCreationAttributes> {}

Log.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      date_time: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      type: {
         type: DataTypes.STRING(20),
         allowNull: false,
      },
      description: {
         type: DataTypes.STRING(255),
         allowNull: false,
      },
   },
   {
      sequelize: sequelize,
      tableName: LOG.TABLE,
      timestamps: false,
      modelName: LOG.TABLE,
      name: {
         plural: LOG.PLURAL,
         singular: LOG.SINGULAR,
      },
   },
);

export { Log };
