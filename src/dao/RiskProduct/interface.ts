export type IRiskProduct = { id?: number; operative_client_id: number; team_id: number };

type RiskProductColumnAliasKeys = 'ID' | 'OPERATIVE_CLIENT_ID' | 'TEAM_ID';
export type IRiskProductColumnsAliases = {
   [key in RiskProductColumnAliasKeys]: keyof IRiskProduct;
};

export type IRiskProductAssociations = object;
