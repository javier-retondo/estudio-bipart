import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { SOCIAL_SECURITY } from './metadata';
import { ISocialSecurity } from './interface';

type SocialSecurityCreationAttributes = Optional<ISocialSecurity, 'id'>;

class SocialSecurity extends Model<ISocialSecurity, SocialSecurityCreationAttributes> {}

SocialSecurity.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      operative_client_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      count: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   },
   {
      sequelize: sequelize,
      tableName: SOCIAL_SECURITY.TABLE,
      timestamps: false,
      modelName: SOCIAL_SECURITY.TABLE,
      name: {
         plural: SOCIAL_SECURITY.PLURAL,
         singular: SOCIAL_SECURITY.SINGULAR,
      },
   },
);

export { SocialSecurity };
