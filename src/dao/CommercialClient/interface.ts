export type ICommercialClient = {
   id?: number;
   fiscal_name: string;
   fiscal_number: string;
   person_type_id: number;
   vat_condition_id: number;
   email?: string;
   phone?: string;
   province?: string;
   city?: string;
   address?: string;
   observations?: string;
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

type CommercialClientColumnAliasKeys =
   | 'ID'
   | 'FISCAL_NAME'
   | 'FISCAL_NUMBER'
   | 'PERSON_TYPE_ID'
   | 'VAT_CONDITION_ID'
   | 'EMAIL'
   | 'PHONE'
   | 'PROVINCE'
   | 'CITY'
   | 'ADDRESS'
   | 'OBSERVATIONS'
   | 'CREATED_AT'
   | 'UPDATED_AT'
   | 'DELETED_AT'
   | 'CREATED_BY'
   | 'UPDATED_BY'
   | 'DELETED_BY'
   | 'SUSPENDED_AT'
   | 'SUSPENDED_BY'
   | 'SUSPENDED_REASON';
export type ICommercialClientColumnsAliases = {
   [key in CommercialClientColumnAliasKeys]: keyof ICommercialClient;
};

export type ICommercialClientAssociations = object;
