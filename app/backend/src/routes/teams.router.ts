import { Router } from 'express';
import Teams from '../database/models/TeamModel';
import TeamService from '../services/teams.service';
import TeamController from '../controllers/teams.controller';

const teamRouter = Router();
const teamService = new TeamService(Teams);
const teamController = new TeamController(teamService);

teamRouter.get('/', teamController.findAll);
teamRouter.get('/:id', teamController.findById);

export default teamRouter;
