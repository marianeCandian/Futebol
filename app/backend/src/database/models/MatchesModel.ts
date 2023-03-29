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

  // public static associations: {
  //   home_team: Association<Matches, Teams>;
  //   away_team: Association<Matches, Teams>;
  // };
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
    modelName: 'matches',
    sequelize: db,
    timestamps: false,
    underscored: true,
  },

  // Matches.belongsTo(Teams, {
  //   as: 'home_team',
  //   foreignKey: 'home_team_id',
  // });

  // Matches.belongsTo(Teams, {
  //   as: 'away_team',
  //   foreignKey: 'away_team_id',
  // });

);

export default Matches;
