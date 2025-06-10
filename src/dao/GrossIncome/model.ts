import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { GROSS_INCOME } from './metadata';
import { IGrossIncome } from './interface';

type GrossIncomeCreationAttributes = Optional<IGrossIncome, 'id'>;

class AllGrossIncome extends Model<IGrossIncome, GrossIncomeCreationAttributes> {}

AllGrossIncome.init(
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
      tableName: GROSS_INCOME.TABLE,
      timestamps: false,
      modelName: GROSS_INCOME.TABLE,
      name: { plural: GROSS_INCOME.PLURAL, singular: GROSS_INCOME.SINGULAR },
      scopes: { notDeleted: { where: [{ deleted_at: null }] } },
   },
);

const GrossIncome = AllGrossIncome.scope('notDeleted');

export { GrossIncome, AllGrossIncome };
