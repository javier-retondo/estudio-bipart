import { USER } from '../metadata';
import { User } from '../models';
import { ISocialSecurityAssociations } from './interface';
import { SOCIAL_SECURITY } from './metadata';

export const socialSecurityIncludes: {
   model: any;
   as: ISocialSecurityAssociations[keyof ISocialSecurityAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [
   {
      model: User,
      as: SOCIAL_SECURITY.ASSOCIATIONS.USER,
      attributes: [USER.COLUMNS.ID, USER.COLUMNS.FIRSTNAME, USER.COLUMNS.LASTNAME],
   },
];
