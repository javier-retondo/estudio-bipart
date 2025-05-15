import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { PERMISSION } from './metadata';
import { IPermission } from './interface';

type PermissionCreationAttributes = Optional<IPermission, 'id'>;

class Permission extends Model<IPermission, PermissionCreationAttributes> {}

Permission.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      module_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      commercial_client_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      date_from: {
         type: DataTypes.DATEONLY,
         allowNull: false,
      },
      date_to: {
         type: DataTypes.DATEONLY,
         allowNull: false,
      },
      allow_read: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
      allow_create: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
      allow_update: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
      allow_delete: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
   },
   {
      sequelize: sequelize,
      tableName: PERMISSION.TABLE,
      timestamps: false,
      modelName: PERMISSION.TABLE,
      name: {
         plural: PERMISSION.PLURAL,
         singular: PERMISSION.SINGULAR,
      },
   },
);

export { Permission };
