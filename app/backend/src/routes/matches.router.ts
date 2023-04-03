import { Router } from 'express';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchesModel';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';
import validateToken from '../middlewares/validateToken';

const matchesRouter = Router();
const matchesService = new MatchesService(Matches, Teams);
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', matchesController.findAll);
matchesRouter.patch('/:id/finish', validateToken, matchesController.finishMatch);

export default matchesRouter;
