import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchesModel';

export default class TeamService {
  private _matchModel: ModelStatic<Matches>;
  private _teamModel: ModelStatic<Teams>;

  constructor(matchModel: ModelStatic<Matches>, teamModel: ModelStatic<Teams>) {
    this._matchModel = matchModel;
    this._teamModel = teamModel;
  }

  public findAll = async (): Promise<Matches[]> => {
    const result = await this._matchModel.findAll({ include: [{
      model: this._teamModel,
      as: 'awayTeam',
    },
    {
      model: this._teamModel,
      as: 'homeTeam',
    }],
    });
    return result;
  };
}
