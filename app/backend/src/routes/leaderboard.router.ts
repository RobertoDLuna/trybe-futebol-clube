import { Router } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';
import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';

const LeaderboardRoutes = Router();

const leaderboardController = new LeaderboardController(
  new LeaderboardController(MatchesModel, TeamsModel),
);

LeaderboardRoutes.get('/leaderboard', (req, res) => leaderboardController.getAll(req, res));

export default LeaderboardRoutes;
