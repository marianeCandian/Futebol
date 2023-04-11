import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  private _leaderboardService: LeaderboardService;

  constructor(leaderboardService: LeaderboardService) {
    this._leaderboardService = leaderboardService;
  }

  public findAll = async (_req: Request, res: Response): Promise<void | Response> => {
    try {
      const arrayLeaderboard = await this._leaderboardService.findAll();
      return res.status(200).json(arrayLeaderboard);
    } catch (error) {
      console.log(error);
    }
  };
}
