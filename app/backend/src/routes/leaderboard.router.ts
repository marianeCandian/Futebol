import { Router } from 'express';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchesModel';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = Router();
const leaderboardService = new LeaderboardService(Teams, Matches);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/home', leaderboardController.findAll);

export default leaderboardRouter;
