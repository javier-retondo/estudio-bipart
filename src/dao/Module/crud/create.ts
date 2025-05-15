import { IModule } from '../interface';
import { Module } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { MODULE } from '../metadata';

class ModulesCreator extends EntityCreator<IModule> {
   model = Module;
   entityName = MODULE.SINGULAR;
}

export const modulesCreator = new ModulesCreator();
