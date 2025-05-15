import { IModule } from '../interface';
import { Module } from '../model';
import { MODULE } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class ModulesUpdater extends EntityUpdater<IModule> {
   model = Module;
   entityName = MODULE.SINGULAR;
}

export const modulesUpdater = new ModulesUpdater();
