import { ISocialSecurity } from '../interface';
import { SocialSecurity } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { SOCIAL_SECURITY } from '../metadata';

class SocialSecuritiesCreator extends EntityCreator<ISocialSecurity> {
   model = SocialSecurity;
   entityName = SOCIAL_SECURITY.SINGULAR;
}

export const socialSecuritiesCreator = new SocialSecuritiesCreator();
