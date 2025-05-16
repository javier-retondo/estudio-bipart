export type IPymeProduct = {
   id?: number;
   pyme_prod_name: string;
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

type PymeProductColumnAliasKeys =
   | 'ID'
   | 'NAME'
   | 'CREATED_AT'
   | 'UPDATED_AT'
   | 'DELETED_AT'
   | 'CREATED_BY'
   | 'UPDATED_BY'
   | 'DELETED_BY'
   | 'SUSPENDED_AT'
   | 'SUSPENDED_BY'
   | 'SUSPENDED_REASON';
export type IPymeProductColumnsAliases = {
   [key in PymeProductColumnAliasKeys]: keyof IPymeProduct;
};

export type IPymeProductAssociations = object;
