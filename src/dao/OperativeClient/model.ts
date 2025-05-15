import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { OPERATIVE_CLIENT } from './metadata';
import { IOperativeClient } from './interface';

type OperativeClientCreationAttributes = Optional<IOperativeClient, 'id'>;

class AllOperativeClient extends Model<IOperativeClient, OperativeClientCreationAttributes> {}

AllOperativeClient.init(
   {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fiscal_name: { type: DataTypes.STRING(100), allowNull: false },
      fiscal_number: { type: DataTypes.STRING(20), allowNull: false },
      person_type_id: { type: DataTypes.INTEGER, allowNull: false },
      activity: { type: DataTypes.STRING(255), allowNull: false },
      born_date: { type: DataTypes.DATEONLY, allowNull: false },
      observations: { type: DataTypes.STRING(255), allowNull: true },
      commercial_client_id: { type: DataTypes.INTEGER, allowNull: false },
      payment_type_id: { type: DataTypes.INTEGER, allowNull: false },
      is_coupon_product: { type: DataTypes.BOOLEAN, allowNull: false },
      is_invoice_product: { type: DataTypes.BOOLEAN, allowNull: false },
      is_system_product: { type: DataTypes.BOOLEAN, allowNull: false },
      is_society_product: { type: DataTypes.BOOLEAN, allowNull: false },
      is_physical_person_product: { type: DataTypes.BOOLEAN, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: true },
      deleted_at: { type: DataTypes.DATE, allowNull: true },
      created_by: { type: DataTypes.INTEGER, allowNull: false },
      updated_by: { type: DataTypes.INTEGER, allowNull: true },
      deleted_by: { type: DataTypes.INTEGER, allowNull: true },
   },
   {
      sequelize: sequelize,
      tableName: OPERATIVE_CLIENT.TABLE,
      timestamps: false,
      modelName: OPERATIVE_CLIENT.TABLE,
      name: { plural: OPERATIVE_CLIENT.PLURAL, singular: OPERATIVE_CLIENT.SINGULAR },
      scopes: { notDeleted: { where: [{ deleted_at: null }] } },
   },
);

const OperativeClient = AllOperativeClient.scope('notDeleted');

export { OperativeClient, AllOperativeClient };
