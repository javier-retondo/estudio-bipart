import { IModule } from '../interface';
import { Module } from '../model';
import { MODULE } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class ModulesPatcher extends EntityPatcher<IModule> {
   model = Module;
   entityName = MODULE.SINGULAR;
}

export const modulesPatcher = new ModulesPatcher();
