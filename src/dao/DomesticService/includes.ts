import { USER } from '../metadata';
import { User } from '../models';
import { IDomesticServiceAssociations } from './interface';
import { DOMESTIC_SERVICE } from './metadata';

export const domesticServiceIncludes: {
   model: any;
   as: IDomesticServiceAssociations[keyof IDomesticServiceAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [
   {
      model: User,
      as: DOMESTIC_SERVICE.ASSOCIATIONS.USER,
      attributes: [USER.COLUMNS.ID, USER.COLUMNS.FIRSTNAME, USER.COLUMNS.LASTNAME],
   },
];
