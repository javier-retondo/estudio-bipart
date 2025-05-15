import { ISocialSecurity } from '../interface';
import { SocialSecurity } from '../model';
import { SOCIAL_SECURITY } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class SocialSecuritiesUpdater extends EntityUpdater<ISocialSecurity> {
   model = SocialSecurity;
   entityName = SOCIAL_SECURITY.SINGULAR;
}

export const socialSecuritiesUpdater = new SocialSecuritiesUpdater();
