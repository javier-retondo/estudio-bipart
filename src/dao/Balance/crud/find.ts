import { IBalance, IBalanceAssociations, IBalanceColumnsAliases } from '../interface';
import { Balance } from '../model';
import { BALANCE } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { balanceIncludes } from '../includes';

class BalancesFinder extends EntityFinder<IBalance, IBalanceAssociations, IBalanceColumnsAliases> {
   model = Balance;
   tableName = BALANCE.TABLE;
   columns = BALANCE.COLUMNS;
   associations = balanceIncludes;
}
export const balancesFinder = new BalancesFinder();
