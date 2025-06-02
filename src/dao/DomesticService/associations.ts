import { USER } from '../metadata';
import { User } from '../models';
import { DOMESTIC_SERVICE } from './metadata';
import { DomesticService } from './model';

export const initDomesticServiceAssociations = () => {
   console.log('   🔄DomesticService Associations is starting...');

   DomesticService.belongsTo(User, {
      foreignKey: DOMESTIC_SERVICE.COLUMNS.USER_ID,
      targetKey: USER.COLUMNS.ID,
      as: DOMESTIC_SERVICE.ASSOCIATIONS.USER,
   });
};
