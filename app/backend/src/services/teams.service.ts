import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamModel';
import { ITeam } from '../interfaces/ITeam';

export default class TeamService {
  private _teamModel: ModelStatic<Teams>;

  constructor(teamModel: ModelStatic<Teams>) {
    this._teamModel = teamModel;
  }

  public async findAll(): Promise<ITeam[]> {
    const result = await this._teamModel.findAll();
    return result;
  }

  public async findById(id: string): Promise<ITeam | null> {
    const result = await this._teamModel.findByPk(id);
    return result;
  }
}
