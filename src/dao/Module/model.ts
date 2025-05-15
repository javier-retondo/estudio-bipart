import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { MODULE } from './metadata';
import { IModule } from './interface';

type ModuleCreationAttributes = Optional<IModule, 'id'>;

class Module extends Model<IModule, ModuleCreationAttributes> {}

Module.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      module_name: {
         type: DataTypes.STRING(50),
         allowNull: false,
      },
   },
   {
      sequelize: sequelize,
      tableName: MODULE.TABLE,
      timestamps: false,
      modelName: MODULE.TABLE,
      name: {
         plural: MODULE.PLURAL,
         singular: MODULE.SINGULAR,
      },
   },
);

export { Module };
