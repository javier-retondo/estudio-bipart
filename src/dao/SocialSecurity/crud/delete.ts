import { SocialSecurity } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { SOCIAL_SECURITY } from '../metadata';

class SocialSecuritiesDeleter extends EntityDeleter {
   model = SocialSecurity;
   entityName = SOCIAL_SECURITY.SINGULAR;
}

export const socialSecuritiesDeleter = new SocialSecuritiesDeleter();
