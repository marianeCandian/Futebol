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
      type: String(30),
      allowNull: false,
    },
  },
  {
    modelName: 'teams',
    sequelize: db,
    timestamps: false,
    underscored: true,
  },
);

export default Teams;
