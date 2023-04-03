import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    modelName: 'Teams',
    tableName: 'teams',
    sequelize: db,
    timestamps: false,
    underscored: true,
  },
);

export default Teams;
