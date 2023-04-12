import { ITeam } from '../../interfaces/ITeam';
import { IMatche } from '../../interfaces/IMatche';

export default class Leaderboard {
  private _name: string;
  private _totalPoints: number;
  private _totalGames: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;
  private _goalsBalance: number;
  private _efficiency: number;
  private _team: ITeam;
  private _matches: IMatche[];

  constructor(team: ITeam, matches: IMatche[]) {
    this._team = team;
    this._matches = matches;
    this._name = this._team.teamName;
    this._totalVictories = this.getTotalVictories();
    this._totalDraws = this.getTotalDraws();
    this._totalLosses = this.getTotalLosses();
    this._goalsFavor = this.getGoalsFavor();
    this._goalsOwn = this.getGoalsOwn();
    this._totalGames = this.getTotalGames();
    this._totalPoints = (this._totalVictories * 3) + this._totalDraws;
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    this._efficiency = Number(this.getEfficienty());
  }

  private getEfficienty = () => {
    const division = (this._totalPoints / (this._totalGames * 3)) * 100;
    const arround = division.toFixed(2);
    return arround;
  };

  private getTotalVictories = () => {
    let value = 0;
    this._matches.forEach((e) => {
      if (e.inProgress === false
         && this._team.id === e.homeTeamId && e.homeTeamGoals > e.awayTeamGoals) {
        value += 1;
      }
    });
    return value;
  };

  private getTotalGames = () => {
    let value = 0;
    this._matches.forEach((e) => {
      if (this._team.id === e.homeTeamId && e.inProgress === false) {
        value += 1;
      }
    });
    return value;
  };

  private getTotalDraws = () => {
    let value = 0;
    this._matches.forEach((e) => {
      if (e.homeTeamGoals === e.awayTeamGoals
         && e.inProgress === false && this._team.id === e.homeTeamId) {
        value += 1;
      }
    });
    return value;
  };

  private getTotalLosses = () => {
    let value = 0;
    this._matches.forEach((e) => {
      if (e.homeTeamGoals < e.awayTeamGoals
         && e.inProgress === false && this._team.id === e.homeTeamId) {
        value += 1;
      }
    });
    return value;
  };

  private getGoalsFavor = () => {
    let value = 0;
    this._matches.forEach((e) => {
      if (this._team.id === e.homeTeamId && e.inProgress === false) {
        value += e.homeTeamGoals;
      }
    });
    return value;
  };

  private getGoalsOwn = () => {
    let value = 0;
    this._matches.forEach((e) => {
      if (this._team.id === e.homeTeamId && e.inProgress === false) {
        value += e.awayTeamGoals;
      }
    });
    return value;
  };

  public getAll = () => {
    const leaderboardTable = {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };

    return leaderboardTable;
  };
}
