import { IMetadata } from '../../utils/interfaces/general';
import { IUserAssociations, IUserColumnsAliases } from './interface';

export const USER: IMetadata<IUserColumnsAliases, IUserAssociations> = {
   TABLE: 'user',
   COLUMNS: {
      ID: 'id',
      FIRSTNAME: 'firstname',
      LASTNAME: 'lastname',
      USERNAME: 'username',
      EMAIL: 'email',
      PHONE: 'phone',
      ID_ADMIN: 'is_admin',
      PASSWORD: 'password',
      IS_PASSWORD_PROVISORY: 'is_pass_provisory',
      CREATED_AT: 'created_at',
      UPDATED_AT: 'updated_at',
      DELETED_AT: 'deleted_at',
      CREATED_BY: 'created_by',
      UPDATED_BY: 'updated_by',
      DELETED_BY: 'deleted_by',
      SUSPENDED_AT: 'suspended_at',
      SUSPENDED_BY: 'suspended_by',
      SUSPENDED_REASON: 'suspended_reason',
   },
   PLURAL: 'Users',
   SINGULAR: 'User',
   ASSOCIATIONS: {},
};
