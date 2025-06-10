import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { MONOTRIBUTIST } from './metadata';
import { IMonotributist } from './interface';

type MonotributistCreationAttributes = Optional<IMonotributist, 'id'>;

class AllMonotributist extends Model<IMonotributist, MonotributistCreationAttributes> {}

AllMonotributist.init(
   {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.STRING(255), allowNull: true, defaultValue: null },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: true },
      deleted_at: { type: DataTypes.DATE, allowNull: true },
      created_by: { type: DataTypes.INTEGER, allowNull: false },
      updated_by: { type: DataTypes.INTEGER, allowNull: true },
      deleted_by: { type: DataTypes.INTEGER, allowNull: true },
      suspended_at: { type: DataTypes.DATE, allowNull: true },
      suspended_by: { type: DataTypes.INTEGER, allowNull: true },
      suspended_reason: { type: DataTypes.STRING(255), allowNull: true },
   },
   {
      sequelize: sequelize,
      tableName: MONOTRIBUTIST.TABLE,
      timestamps: false,
      modelName: MONOTRIBUTIST.TABLE,
      name: { plural: MONOTRIBUTIST.PLURAL, singular: MONOTRIBUTIST.SINGULAR },
      scopes: { notDeleted: { where: [{ deleted_at: null }] } },
   },
);

const Monotributist = AllMonotributist.scope('notDeleted');

export { Monotributist, AllMonotributist };
