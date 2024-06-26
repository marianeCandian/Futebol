import { ModelStatic } from 'sequelize';
import Leaderboard from '../database/models/LeaderboardModel';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchesModel';
import { ILeaderboard } from '../interfaces/ILeaderboard';

export default class LeaderboardService {
  private _teamModel: ModelStatic<Teams>;
  private _matchModel: ModelStatic<Matches>;

  constructor(teamModel: ModelStatic<Teams>, matchModel: ModelStatic<Matches>) {
    this._teamModel = teamModel;
    this._matchModel = matchModel;
  }

  private sortArray = (leaderboardArray: ILeaderboard[]): ILeaderboard[] => {
    const organized = leaderboardArray.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return 0;
    });

    return organized;
  };

  public findAll = async (): Promise<ILeaderboard[]> => {
    const teams = await this._teamModel.findAll();
    const matches = await this._matchModel.findAll();
    const leaderboardHome = teams.map((team) => {
      const result = new Leaderboard(team, matches);
      return result.getAll();
    });

    const organized = this.sortArray(leaderboardHome);

    return organized;
  };
}
