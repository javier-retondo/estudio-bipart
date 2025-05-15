import {
   ISocialSecurity,
   ISocialSecurityAssociations,
   ISocialSecurityColumnsAliases,
} from '../interface';
import { SocialSecurity } from '../model';
import { SOCIAL_SECURITY } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { socialSecurityIncludes } from '../includes';

class SocialSecuritiesFinder extends EntityFinder<
   ISocialSecurity,
   ISocialSecurityAssociations,
   ISocialSecurityColumnsAliases
> {
   model = SocialSecurity;
   tableName = SOCIAL_SECURITY.TABLE;
   columns = SOCIAL_SECURITY.COLUMNS;
   associations = socialSecurityIncludes;
}
export const socialSecuritiesFinder = new SocialSecuritiesFinder();
