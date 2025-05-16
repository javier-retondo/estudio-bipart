import { USER } from '../metadata';
import { User } from '../models';
import { SOCIAL_SECURITY } from './metadata';
import { SocialSecurity } from './model';

export const initSocialSecurityAssociations = () => {
   console.log('🚀 DomesticService Associations is starting...');

   SocialSecurity.belongsTo(User, {
      foreignKey: SOCIAL_SECURITY.COLUMNS.USER_ID,
      targetKey: USER.COLUMNS.ID,
      as: SOCIAL_SECURITY.ASSOCIATIONS.USER,
   });
};
