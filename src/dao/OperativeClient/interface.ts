export type IOperativeClient = {
   id?: number;
   fiscal_name: string;
   fiscal_number: string;
   person_type_id: number;
   activity: string;
   born_date: Date;
   observations?: string;
   commercial_client_id: number;
   payment_type_id: number;
   is_coupon_product: boolean;
   is_invoice_product: boolean;
   is_system_product: boolean;
   is_society_product: boolean;
   is_physical_person_product: boolean;
   created_at?: Date;
   updated_at?: Date | null;
   deleted_at?: Date | null;
   created_by: number;
   updated_by?: number | null;
   deleted_by?: number | null;
   suspended_at?: Date | null;
   suspended_by?: number | null;
   suspended_reason?: string | null;
};

type OperativeClientColumnAliasKeys =
   | 'ID'
   | 'FISCAL_NAME'
   | 'FISCAL_NUMBER'
   | 'PERSON_TYPE_ID'
   | 'BORN_DATE'
   | 'OBSERVATIONS'
   | 'COMMERCIAL_CLIENT_ID'
   | 'PAYMENT_TYPE_ID'
   | 'IS_COUPON_PROD'
   | 'IS_INVOICE_PROD'
   | 'IS_SYSTEM_PROD'
   | 'IS_SOCIETY_PROD'
   | 'IS_PHYSICAL_PERSON_PROD'
   | 'CREATED_AT'
   | 'UPDATED_AT'
   | 'DELETED_AT'
   | 'CREATED_BY'
   | 'UPDATED_BY'
   | 'DELETED_BY'
   | 'SUSPENDED_AT'
   | 'SUSPENDED_BY'
   | 'SUSPENDED_REASON';
export type IOperativeClientColumnsAliases = {
   [key in OperativeClientColumnAliasKeys]: keyof IOperativeClient;
};

export type IOperativeClientAssociations = object;
