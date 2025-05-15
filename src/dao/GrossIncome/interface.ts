export type IGrossIncome = {
   id?: number;
   name: string;
   created_at?: Date;
   updated_at?: Date | null;
   deleted_at?: Date | null;
   created_by: number;
   updated_by?: number | null;
   deleted_by?: number | null;
};

type GrossIncomeColumnAliasKeys =
   | 'ID'
   | 'NAME'
   | 'CREATED_AT'
   | 'UPDATED_AT'
   | 'DELETED_AT'
   | 'CREATED_BY'
   | 'UPDATED_BY'
   | 'DELETED_BY';
export type IGrossIncomeColumnsAliases = {
   [key in GrossIncomeColumnAliasKeys]: keyof IGrossIncome;
};

export type IGrossIncomeAssociations = object;
