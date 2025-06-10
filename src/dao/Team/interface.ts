import { IUser } from '../interfaces';

export type ITeam = {
   id?: number;
   team_name: string;
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

   // Associations
   userSuspendedBy?: IUser;
   userCreatedBy?: IUser;
   userUpdatedBy?: IUser;
   userDeletedBy?: IUser;
};

type TeamColumnAliasKeys =
   | 'ID'
   | 'TEAM_NAME'
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
export type ITeamColumnsAliases = { [key in TeamColumnAliasKeys]: keyof ITeam };

type TeamAssociationKeys =
   | 'USER_SUSPENDED_BY'
   | 'USER_CREATED_BY'
   | 'USER_UPDATED_BY'
   | 'USER_DELETED_BY';

export type ITeamAssociations = { [key in TeamAssociationKeys]: keyof ITeam };
