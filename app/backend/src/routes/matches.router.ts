import { Router } from 'express';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';
import MatchesModel from '../models/matches.model';
import UserModel from '../models/user.model';
import TeamsModel from '../models/teams.model';

const MatchesRoutes = Router();

const matchesController = new MatchesController(new MatchesService(
  MatchesModel,
  UserModel,
  TeamsModel,
));

MatchesRoutes.get('/Matches', (req, res) => matchesController.getAllMatches(req, res));
MatchesRouter.post('/matches', (req, res) => matchesController.saveMatch(req, res));
MatchesRouter.patch('/matches/:id/finish', (req, res) => matchesController.endMatch(req, res));

export default MatchesRoutes;
