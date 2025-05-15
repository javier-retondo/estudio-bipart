import { IMetadata } from '../../utils/interfaces/general';
import { IDigitalCertAssociations, IDigitalCertColumnsAliases } from './interface';

export const DIGITAL_CERT: IMetadata<IDigitalCertColumnsAliases, IDigitalCertAssociations> = {
   TABLE: 'digital_cert',
   COLUMNS: {
      ID: 'id',
      NAME: 'name',
      BUSSINES_NAME: 'bussines_name',
      BUSSINES_NUMBER: 'bussines_number',
      CERT_FILENAME: 'cert_filename',
      KEY_FILENAME: 'key_filename',
      EXPIRES_AT: 'expires_at',
      FINGERPRINT: 'fingerprint',
      ALLOW_INVOICE: 'allow_invoice',
      ALLOW_GET_FISCAL_DATA: 'allow_get_fiscal_data',
      CREATED_AT: 'created_at',
      UPDATED_AT: 'updated_at',
      DELETED_AT: 'deleted_at',
      CREATED_BY: 'created_by',
      UPDATED_BY: 'updated_by',
      DELETED_BY: 'deleted_by',
   },
   PLURAL: 'DigitalCerts',
   SINGULAR: 'DigitalCert',
   ASSOCIATIONS: {},
};
