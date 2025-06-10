export type IMonotributist = {
   id?: number;
   name: string;
   description?: string | null;
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

type MonotributistColumnAliasKeys =
   | 'ID'
   | 'NAME'
   | 'DESCRIPTION'
   | 'CREATED_AT'
   | 'UPDATED_AT'
   | 'DELETED_AT'
   | 'CREATED_BY'
   | 'UPDATED_BY'
   | 'DELETED_BY'
   | 'SUSPENDED_AT'
   | 'SUSPENDED_BY'
   | 'SUSPENDED_REASON';
export type IMonotributistColumnsAliases = {
   [key in MonotributistColumnAliasKeys]: keyof IMonotributist;
};

export type IMonotributistAssociations = object;
