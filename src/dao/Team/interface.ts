export type ITeam = {
   id?: number;
   team_name: string;
   created_at?: Date;
   updated_at?: Date | null;
   deleted_at?: Date | null;
   created_by: number;
   updated_by?: number | null;
   deleted_by?: number | null;
};

type TeamColumnAliasKeys =
   | 'ID'
   | 'TEAM_NAME'
   | 'CREATED_AT'
   | 'UPDATED_AT'
   | 'DELETED_AT'
   | 'CREATED_BY'
   | 'UPDATED_BY'
   | 'DELETED_BY';
export type ITeamColumnsAliases = { [key in TeamColumnAliasKeys]: keyof ITeam };

export type ITeamAssociations = object;
