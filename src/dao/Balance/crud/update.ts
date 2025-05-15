import { IBalance } from '../interface';
import { Balance } from '../model';
import { BALANCE } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class BalancesUpdater extends EntityUpdater<IBalance> {
   model = Balance;
   entityName = BALANCE.SINGULAR;
}

export const balancesUpdater = new BalancesUpdater();
