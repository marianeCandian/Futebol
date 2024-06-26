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
        return res.status(200).json(teams);
      }
      const result = await this._matchService.findByProgress(inProgress as string);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  };

  public finishMatch = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params;
      await this._matchService.finishMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      console.log(error);
    }
  };

  public updateScore = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params;
      const { awayTeamGoals, homeTeamGoals } = req.body;
      await this._matchService.updateScore(awayTeamGoals, homeTeamGoals, Number(id));

      return res.status(200).json({ message: 'Score updated successfully' });
    } catch (error) {
      console.log(error);
    }
  };

  public creatMatch = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const newMatch = req.body;
      const match = await this._matchService.creatMatch(newMatch);
      return res.status(201).json(match);
    } catch (error) {
      console.log(error);
    }
  };
}
