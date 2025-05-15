import { ISocialSecurity } from '../interface';
import { SocialSecurity } from '../model';
import { SOCIAL_SECURITY } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class SocialSecuritiesPatcher extends EntityPatcher<ISocialSecurity> {
   model = SocialSecurity;
   entityName = SOCIAL_SECURITY.SINGULAR;
}

export const socialSecuritiesPatcher = new SocialSecuritiesPatcher();
