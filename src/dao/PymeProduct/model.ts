import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { PYME_PRODUCT } from './metadata';
import { IPymeProduct } from './interface';

type PymeProductCreationAttributes = Optional<IPymeProduct, 'id'>;

class AllPymeProduct extends Model<IPymeProduct, PymeProductCreationAttributes> {}

AllPymeProduct.init(
   {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      pyme_prod_name: { type: DataTypes.STRING(100), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: true },
      deleted_at: { type: DataTypes.DATE, allowNull: true },
      created_by: { type: DataTypes.INTEGER, allowNull: false },
      updated_by: { type: DataTypes.INTEGER, allowNull: true },
      deleted_by: { type: DataTypes.INTEGER, allowNull: true },
   },
   {
      sequelize: sequelize,
      tableName: PYME_PRODUCT.TABLE,
      timestamps: false,
      modelName: PYME_PRODUCT.TABLE,
      name: { plural: PYME_PRODUCT.PLURAL, singular: PYME_PRODUCT.SINGULAR },
      scopes: { notDeleted: { where: [{ deleted_at: null }] } },
   },
);

const PymeProduct = AllPymeProduct.scope('notDeleted');

export { PymeProduct, AllPymeProduct };
