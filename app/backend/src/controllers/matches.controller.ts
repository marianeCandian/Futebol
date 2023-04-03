import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

export default class MatchesController {
  private _matchService: MatchService;

  constructor(matchService: MatchService) {
    this._matchService = matchService;
  }

  public findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const teams = await this._matchService.findAll();
      res.status(200).json(teams);
    } catch (error) {
      console.log(error);
    }
  };
}
