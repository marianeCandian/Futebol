import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class TeamController {
  private _teamService: TeamService;

  constructor(teamService: TeamService) {
    this._teamService = teamService;
  }

  public findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const teams = await this._teamService.findAll();
      res.status(200).json(teams);
    } catch (error) {
      console.log(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const team = await this._teamService.findById(id);
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}
