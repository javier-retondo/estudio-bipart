import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { LOG } from './metadata';
import { ILog, LOG_TYPES } from './interface';

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
         allowNull: true,
      },
      type: {
         type: DataTypes.ENUM(
            LOG_TYPES.CREATE,
            LOG_TYPES.UPDATE,
            LOG_TYPES.DELETE,
            LOG_TYPES.LOGIN,
            LOG_TYPES.LOGOUT,
            LOG_TYPES.ERROR,
            LOG_TYPES.INFO,
            LOG_TYPES.WARNING,
            LOG_TYPES.DEBUG,
         ),
         allowNull: false,
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      endpoint: {
         type: DataTypes.STRING(255),
         allowNull: true,
      },
      method: {
         type: DataTypes.STRING(10),
         allowNull: true,
      },
      stack_trace: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      sql: {
         type: DataTypes.TEXT,
         allowNull: true,
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
