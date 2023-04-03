import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

export default class MatchesController {
  private _matchService: MatchService;

  constructor(matchService: MatchService) {
    this._matchService = matchService;
  }

  public findAll = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { inProgress } = req.query;
      if (inProgress === undefined) {
        const teams = await this._matchService.findAll();
        res.status(200).json(teams);
      }
      const result = await this._matchService.findByProgress(inProgress as string);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  };
}
