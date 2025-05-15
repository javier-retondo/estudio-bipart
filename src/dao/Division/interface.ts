export type IDivision = {
   id?: number;
   division_name: string;
   created_at?: Date;
   updated_at?: Date | null;
   deleted_at?: Date | null;
   created_by: number;
   updated_by?: number | null;
   deleted_by?: number | null;
};

type DivisionColumnAliasKeys =
   | 'ID'
   | 'DIVISION_NAME'
   | 'CREATED_AT'
   | 'UPDATED_AT'
   | 'DELETED_AT'
   | 'CREATED_BY'
   | 'UPDATED_BY'
   | 'DELETED_BY';
export type IDivisionColumnsAliases = { [key in DivisionColumnAliasKeys]: keyof IDivision };

export type IDivisionAssociations = object;
