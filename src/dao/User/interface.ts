import { IModule, IPermission } from '../interfaces';

export type IUser = {
   id?: number;
   firstname: string;
   lastname: string;
   username: string;
   email: string;
   phone?: string;
   is_admin?: boolean;
   password?: string;
   is_pass_provisory: boolean;
   created_at?: Date;
   updated_at?: Date | null;
   deleted_at?: Date | null;
   created_by?: number | null;
   updated_by?: number | null;
   deleted_by?: number | null;
   suspended_at?: Date | null;
   suspended_by?: number | null;
   suspended_reason?: string | null;

   // Associations
   Permissions?: IPermission[];
   Modules?: IModule[];
};

type UserColumnAliasKeys =
   | 'ID'
   | 'FIRSTNAME'
   | 'LASTNAME'
   | 'USERNAME'
   | 'EMAIL'
   | 'PHONE'
   | 'ID_ADMIN'
   | 'PASSWORD'
   | 'IS_PASSWORD_PROVISORY'
   | 'CREATED_AT'
   | 'UPDATED_AT'
   | 'DELETED_AT'
   | 'CREATED_BY'
   | 'UPDATED_BY'
   | 'DELETED_BY'
   | 'SUSPENDED_AT'
   | 'SUSPENDED_BY'
   | 'SUSPENDED_REASON';
export type IUserColumnsAliases = { [key in UserColumnAliasKeys]: keyof IUser };

type UserAssociationKeys = 'PERMISSIONS';

export type IUserAssociations = { [key in UserAssociationKeys]: keyof IUser };
