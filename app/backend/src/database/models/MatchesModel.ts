import { Model, DataTypes } from 'sequelize';
import db from '.';
// import Teams from './TeamModel';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    modelName: 'Matches',
    tableName: 'matches',
    sequelize: db,
    timestamps: false,
    underscored: true,
  },

  // Teams.hasMany(Matches, { foreignKey: 'id', as: 'awaysTeamId' });
  // Teams.hasMany(Matches, { foreignKey: 'id', as: 'homeTeamId' });

  // Matches.belongsTo(Teams, { foreignKey: 'away_team_id', as: 'awaysTeamId' });
  // Matches.belongsTo(Teams, { foreignKey: 'home_team_id', as: 'homeTeamId' });

);

export default Matches;
