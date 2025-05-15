import { IBalance } from '../interface';
import { Balance } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { BALANCE } from '../metadata';

class BalancesCreator extends EntityCreator<IBalance> {
   model = Balance;
   entityName = BALANCE.SINGULAR;
}

export const balancesCreator = new BalancesCreator();
