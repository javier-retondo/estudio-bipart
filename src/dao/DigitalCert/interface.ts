export type IDigitalCert = {
   id?: number;
   name: string;
   bussines_name: string;
   bussines_number: string;
   cert_filename: string;
   key_filename: string;
   expires_at: Date;
   fingerprint: string;
   allow_invoice: boolean;
   allow_get_fiscal_data: boolean;
   created_at?: Date;
   updated_at?: Date | null;
   deleted_at?: Date | null;
   created_by?: number | null;
   updated_by?: number | null;
   deleted_by?: number | null;
   suspended_at?: Date | null;
   suspended_by?: number | null;
   suspended_reason?: string | null;
};

type DigitalCertColumnAliasKeys =
   | 'ID'
   | 'NAME'
   | 'BUSSINES_NAME'
   | 'BUSSINES_NUMBER'
   | 'CERT_FILENAME'
   | 'KEY_FILENAME'
   | 'EXPIRES_AT'
   | 'FINGERPRINT'
   | 'ALLOW_INVOICE'
   | 'ALLOW_GET_FISCAL_DATA'
   | 'CREATED_AT'
   | 'UPDATED_AT'
   | 'DELETED_AT'
   | 'CREATED_BY'
   | 'UPDATED_BY'
   | 'DELETED_BY'
   | 'SUSPENDED_AT'
   | 'SUSPENDED_BY'
   | 'SUSPENDED_REASON';
export type IDigitalCertColumnsAliases = {
   [key in DigitalCertColumnAliasKeys]: keyof IDigitalCert;
};

export type IDigitalCertAssociations = object;
