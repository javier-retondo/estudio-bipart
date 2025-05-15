import { Module } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { MODULE } from '../metadata';

class ModulesDeleter extends EntityDeleter {
   model = Module;
   entityName = MODULE.SINGULAR;
}

export const modulesDeleter = new ModulesDeleter();
