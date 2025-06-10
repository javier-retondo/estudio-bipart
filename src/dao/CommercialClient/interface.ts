import { IOperativeClient } from '../interfaces';
import { IVatCondition } from '../VatCondition/interface';

export type ICommercialClient = {
   id?: number;
   fiscal_name: string;
   fiscal_number: string;
   is_physical_person: boolean;
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
   created_by?: number;
   updated_by?: number | null;
   deleted_by?: number | null;
   suspended_at?: Date | null;
   suspended_by?: number | null;
   suspended_reason?: string | null;

   // Associations
   OperativeClients?: IOperativeClient[];
   VatCondition?: IVatCondition;

   // Virtual fields
   province_id?: number;
};

type CommercialClientColumnAliasKeys =
   | 'ID'
   | 'FISCAL_NAME'
   | 'FISCAL_NUMBER'
   | 'IS_PHYSICAL_PERSON'
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

type CommercialClientAssociationAliasKeys = 'OPERATIVE_CLIENT' | 'VAT_CONDITION';

export type ICommercialClientAssociations = {
   [key in CommercialClientAssociationAliasKeys]: keyof ICommercialClient;
};
