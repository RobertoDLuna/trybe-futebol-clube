import { Router } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';
import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';

const LeaderboardRoutes = Router();

const leaderboardController = new LeaderboardController(
  new LeaderboardService(MatchesModel, TeamsModel),
);

LeaderboardRoutes.get('/leaderboard', (req, res) => leaderboardController.getAll(req, res));
LeaderboardRoutes.get('/leaderboard/home', (req, res) => leaderboardController.getHome(req, res));
LeaderboardRoutes.get('/leaderboard/away', (req, res) => leaderboardController.getAway(req, res));

export default LeaderboardRoutes;
