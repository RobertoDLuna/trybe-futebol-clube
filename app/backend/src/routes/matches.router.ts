import { Router } from 'express';
import UserModel from '../models/user.model';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';
import MatchesModel from '../models/matches.model';
import TeamsModel from '../models/teams.model';

const MatchesRoutes = Router();

const matchesController = new MatchesController(new MatchesService(
  MatchesModel,
  TeamsModel,
  UserModel,
));

MatchesRoutes.get('/Matches', (req, res) => matchesController.getAllMatches(req, res));
MatchesRoutes.post('/matches', (req, res) => matchesController.saveMatch(req, res));
MatchesRoutes.patch('/matches/:id/finish', (req, res) => matchesController.endMatch(req, res));
MatchesRoutes.patch('/matches/:id', (req, res) => matchesController.updateMatch(req, res));

export default MatchesRoutes;
