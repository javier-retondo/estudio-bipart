import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config';
import { TEAM } from './metadata';
import { ITeam } from './interface';

type TeamCreationAttributes = Optional<ITeam, 'id'>;

class AllTeam extends Model<ITeam, TeamCreationAttributes> {}

AllTeam.init(
   {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      team_name: { type: DataTypes.STRING(50), allowNull: false },
      description: { type: DataTypes.STRING(255), allowNull: true, defaultValue: null },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
      deleted_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
      created_by: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
      updated_by: { type: DataTypes.INTEGER, allowNull: true },
      deleted_by: { type: DataTypes.INTEGER, allowNull: true },
      suspended_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
      suspended_by: { type: DataTypes.INTEGER, allowNull: true },
      suspended_reason: { type: DataTypes.STRING(255), allowNull: true },
   },
   {
      sequelize: sequelize,
      tableName: TEAM.TABLE,
      timestamps: false,
      modelName: TEAM.TABLE,
      name: { plural: TEAM.PLURAL, singular: TEAM.SINGULAR },
      scopes: { notDeleted: { where: [{ deleted_at: null }] } },
   },
);

const Team = AllTeam.scope('notDeleted');

export { Team, AllTeam };
