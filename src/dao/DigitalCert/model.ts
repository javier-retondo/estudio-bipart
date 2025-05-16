import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { DIGITAL_CERT } from './metadata';
import { IDigitalCert } from './interface';

type DigitalCertCreationAttributes = Optional<IDigitalCert, 'id'>;

class AllDigitalCert extends Model<IDigitalCert, DigitalCertCreationAttributes> {}

AllDigitalCert.init(
   {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(50), allowNull: false },
      bussines_name: { type: DataTypes.STRING(100), allowNull: false },
      bussines_number: { type: DataTypes.STRING(20), allowNull: false },
      cert_filename: { type: DataTypes.STRING(100), allowNull: false },
      key_filename: { type: DataTypes.STRING(100), allowNull: false },
      expires_at: { type: DataTypes.DATE, allowNull: false },
      fingerprint: { type: DataTypes.STRING(255), allowNull: false },
      allow_invoice: { type: DataTypes.BOOLEAN, allowNull: false },
      allow_get_fiscal_data: { type: DataTypes.BOOLEAN, allowNull: false },
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
      tableName: DIGITAL_CERT.TABLE,
      timestamps: false,
      modelName: DIGITAL_CERT.TABLE,
      name: { plural: DIGITAL_CERT.PLURAL, singular: DIGITAL_CERT.SINGULAR },
      scopes: { notDeleted: { where: [{ deleted_at: null }] } },
   },
);

const DigitalCert = AllDigitalCert.scope('notDeleted');

export { DigitalCert, AllDigitalCert };
