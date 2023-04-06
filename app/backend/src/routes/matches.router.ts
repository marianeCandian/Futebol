import { Router } from 'express';
import validateCreateMatch from '../middlewares/validateCreateMatch';
import Teams from '../database/models/TeamModel';
import MatchesService from '../services/matches.service';
import Matches from '../database/models/MatchesModel';
import MatchesController from '../controllers/matches.controller';
import validateToken from '../middlewares/validateToken';

const matchesRouter = Router();
const matchesService = new MatchesService(Matches, Teams);
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', matchesController.findAll);
matchesRouter.patch('/:id', validateToken, matchesController.updateScore);
matchesRouter.patch('/:id/finish', validateToken, matchesController.finishMatch);
matchesRouter.post('/', validateToken, validateCreateMatch, matchesController.creatMatch);

export default matchesRouter;
