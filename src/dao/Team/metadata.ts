import { IMetadata } from '../../utils/interfaces/general';
import { ITeamAssociations, ITeamColumnsAliases } from './interface';

export const TEAM: IMetadata<ITeamColumnsAliases, ITeamAssociations> = {
   TABLE: 'team',
   COLUMNS: {
      ID: 'id',
      TEAM_NAME: 'team_name',
      DESCRIPTION: 'description',
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
   PLURAL: 'Teams',
   SINGULAR: 'Team',
   ASSOCIATIONS: {
      USER_SUSPENDED_BY: 'userSuspendedBy',
      USER_CREATED_BY: 'userCreatedBy',
      USER_UPDATED_BY: 'userUpdatedBy',
      USER_DELETED_BY: 'userDeletedBy',
   },
};
