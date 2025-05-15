import { IModule, IModuleAssociations, IModuleColumnsAliases } from '../interface';
import { Module } from '../model';
import { MODULE } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { moduleIncludes } from '../includes';

class ModulesFinder extends EntityFinder<IModule, IModuleAssociations, IModuleColumnsAliases> {
   model = Module;
   tableName = MODULE.TABLE;
   columns = MODULE.COLUMNS;
   associations = moduleIncludes;
}
export const modulesFinder = new ModulesFinder();
