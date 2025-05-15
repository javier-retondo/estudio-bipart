import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { DIVISION } from './metadata';
import { IDivision } from './interface';

type DivisionCreationAttributes = Optional<IDivision, 'id'>;

class AllDivision extends Model<IDivision, DivisionCreationAttributes> {}

AllDivision.init(
   {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      division_name: { type: DataTypes.STRING(50), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: true },
      deleted_at: { type: DataTypes.DATE, allowNull: true },
      created_by: { type: DataTypes.INTEGER, allowNull: false },
      updated_by: { type: DataTypes.INTEGER, allowNull: true },
      deleted_by: { type: DataTypes.INTEGER, allowNull: true },
   },
   {
      sequelize: sequelize,
      tableName: DIVISION.TABLE,
      timestamps: false,
      modelName: DIVISION.TABLE,
      name: { plural: DIVISION.PLURAL, singular: DIVISION.SINGULAR },
      scopes: { notDeleted: { where: [{ deleted_at: null }] } },
   },
);

const Division = AllDivision.scope('notDeleted');

export { Division, AllDivision };
