import { IBalance } from '../interface';
import { Balance } from '../model';
import { BALANCE } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class BalancesPatcher extends EntityPatcher<IBalance> {
   model = Balance;
   entityName = BALANCE.SINGULAR;
}

export const balancesPatcher = new BalancesPatcher();
