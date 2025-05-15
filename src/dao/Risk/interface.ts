export type IRisk = {
   id?: number;
   operative_client_id: number;
   team_id: number;
};

type RiskColumnAliasKeys = 'ID' | 'OPERATIVE_CLIENT_ID' | 'TEAM_ID';
export type IRiskColumnsAliases = {
   [key in RiskColumnAliasKeys]: keyof IRisk;
};

export type IRiskAssociations = object;
