import { Router } from 'express';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';
import MatchesModel from '../models/matches.model';

const MatchesRoutes = Router();

const matchesController = new MatchesController(new MatchesService(MatchesModel));

MatchesRoutes.get('/Matches', (req, res) => matchesController.getAllMatches(req, res));

export default MatchesRoutes;
