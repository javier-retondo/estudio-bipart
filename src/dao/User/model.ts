import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { USER } from './metadata';
import { IUser } from './interface';

type UserCreationAttributes = Optional<IUser, 'id'>;

class AllUser extends Model<IUser, UserCreationAttributes> {}

AllUser.init(
   {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      firstname: { type: DataTypes.STRING(50), allowNull: false },
      lastname: { type: DataTypes.STRING(50), allowNull: false },
      username: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: false },
      phone: { type: DataTypes.STRING(20), allowNull: true },
      is_admin: { type: DataTypes.BOOLEAN, allowNull: false },
      password: { type: DataTypes.STRING(255), allowNull: false },
      is_pass_provisory: { type: DataTypes.BOOLEAN, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: true },
      deleted_at: { type: DataTypes.DATE, allowNull: true },
      created_by: { type: DataTypes.INTEGER, allowNull: true },
      updated_by: { type: DataTypes.INTEGER, allowNull: true },
      deleted_by: { type: DataTypes.INTEGER, allowNull: true },
   },
   {
      sequelize: sequelize,
      tableName: USER.TABLE,
      timestamps: false,
      modelName: USER.TABLE,
      name: { plural: USER.PLURAL, singular: USER.SINGULAR },
      scopes: { notDeleted: { where: [{ deleted_at: null }] } },
   },
);

const User = AllUser.scope('notDeleted');

export { User, AllUser };
