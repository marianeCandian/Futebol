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

  public verifyQuery = (query: string) => {
    if (query === 'true') return true;

    return false;
  };

  public findByProgress = async (query: string): Promise<Matches[]> => {
    const queryBool = this.verifyQuery(query);
    const result = await this._matchModel.findAll({
      where: { inProgress: queryBool },
      include: [{ model: this._teamModel, as: 'awayTeam' },
        { model: this._teamModel, as: 'homeTeam' }],
    });
    return result;
  };

  public finishMatch = async (id: number): Promise<void> => {
    await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  };
}
