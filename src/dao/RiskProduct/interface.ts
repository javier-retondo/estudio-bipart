import { ITeam } from '../interfaces';

export type IRiskProduct = {
   id?: number;
   operative_client_id: number;
   team_id: number;

   // Associations
   Team?: ITeam;
};

type RiskProductColumnAliasKeys = 'ID' | 'OPERATIVE_CLIENT_ID' | 'TEAM_ID';
export type IRiskProductColumnsAliases = {
   [key in RiskProductColumnAliasKeys]: keyof IRiskProduct;
};

type RiskProductAssociationsKeys = 'TEAM';

export type IRiskProductAssociations = {
   [key in RiskProductAssociationsKeys]: keyof IRiskProduct;
};
