export type ILog = {
   id?: number;
   date_time: Date;
   user_id: number;
   type: string;
   description: string;
};

type LogColumnAliasKeys = 'ID' | 'DATE_TIME' | 'USER_ID' | 'TYPE' | 'DESCRIPTION';
export type ILogColumnsAliases = {
   [key in LogColumnAliasKeys]: keyof ILog;
};

export type ILogAssociations = object;
