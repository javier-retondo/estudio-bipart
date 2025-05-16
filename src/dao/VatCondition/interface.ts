export type IVatCondition = {
   id?: number;
   description: string;
};

type VatConditionColumnAliasKeys = 'ID' | 'DESCRIPTION';
export type IVatConditionColumnsAliases = {
   [key in VatConditionColumnAliasKeys]: keyof IVatCondition;
};

export type IVatConditionAssociations = object;
