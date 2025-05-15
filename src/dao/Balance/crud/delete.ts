import { Balance } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { BALANCE } from '../metadata';

class BalancesDeleter extends EntityDeleter {
   model = Balance;
   entityName = BALANCE.SINGULAR;
}

export const balancesDeleter = new BalancesDeleter();
