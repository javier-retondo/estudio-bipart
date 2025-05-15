import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { DOMESTIC_SERVICE } from './metadata';
import { IDomesticService } from './interface';

type DomesticServiceCreationAttributes = Optional<IDomesticService, 'id'>;

class DomesticService extends Model<IDomesticService, DomesticServiceCreationAttributes> {}

DomesticService.init(
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
      count: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   },
   {
      sequelize: sequelize,
      tableName: DOMESTIC_SERVICE.TABLE,
      timestamps: false,
      modelName: DOMESTIC_SERVICE.TABLE,
      name: {
         plural: DOMESTIC_SERVICE.PLURAL,
         singular: DOMESTIC_SERVICE.SINGULAR,
      },
   },
);

export { DomesticService };
