import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { COMMERCIAL_CLIENT } from './metadata';
import { ICommercialClient } from './interface';

type CommercialClientCreationAttributes = Optional<ICommercialClient, 'id'>;

class AllCommercialClient extends Model<ICommercialClient, CommercialClientCreationAttributes> {}

AllCommercialClient.init(
   {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fiscal_name: { type: DataTypes.STRING(100), allowNull: false },
      fiscal_number: { type: DataTypes.STRING(20), allowNull: false },
      is_physical_person: { type: DataTypes.BOOLEAN, allowNull: false },
      vat_condition_id: { type: DataTypes.INTEGER, allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: true },
      phone: { type: DataTypes.STRING(20), allowNull: true },
      province: { type: DataTypes.STRING(50), allowNull: true },
      city: { type: DataTypes.STRING(150), allowNull: true },
      address: { type: DataTypes.STRING(200), allowNull: true },
      observations: { type: DataTypes.STRING(255), allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
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
      tableName: COMMERCIAL_CLIENT.TABLE,
      timestamps: false,
      modelName: COMMERCIAL_CLIENT.TABLE,
      name: { plural: COMMERCIAL_CLIENT.PLURAL, singular: COMMERCIAL_CLIENT.SINGULAR },
      scopes: { notDeleted: { where: [{ deleted_at: null }] } },
   },
);

const CommercialClient = AllCommercialClient.scope('notDeleted');

export { CommercialClient, AllCommercialClient };
