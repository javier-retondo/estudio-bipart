export type IModule = {
   id?: number;
   module_name: string;
};

type ModuleColumnAliasKeys = 'ID' | 'MODULE_NAME';
export type IModuleColumnsAliases = {
   [key in ModuleColumnAliasKeys]: keyof IModule;
};

export type IModuleAssociations = object;
