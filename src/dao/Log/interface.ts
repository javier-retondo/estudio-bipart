import { IUser } from '../interfaces';

export enum LOG_TYPES {
   CREATE = 'CREATE',
   UPDATE = 'UPDATE',
   DELETE = 'DELETE',
   LOGIN = 'LOGIN',
   LOGOUT = 'LOGOUT',
   ERROR = 'ERROR',
   INFO = 'INFO',
   WARNING = 'WARNING',
   DEBUG = 'DEBUG',
}

export type ILog = {
   id?: number;
   date_time: Date | string;
   user_id?: number;
   type: LOG_TYPES;
   description: string;
   endpoint?: string | null;
   method?: string | null;
   stack_trace?: string | null;
   sql?: string | null;

   // Associations
   User?: IUser;
};

type LogColumnAliasKeys =
   | 'ID'
   | 'DATE_TIME'
   | 'USER_ID'
   | 'TYPE'
   | 'DESCRIPTION'
   | 'ENDPOINT'
   | 'METHOD'
   | 'STACK_TRACE'
   | 'SQL';

export type ILogColumnsAliases = {
   [key in LogColumnAliasKeys]: keyof ILog;
};

type LogAssociationAliasKeys = 'USER';

export type ILogAssociations = {
   [key in LogAssociationAliasKeys]: keyof ILog;
};
