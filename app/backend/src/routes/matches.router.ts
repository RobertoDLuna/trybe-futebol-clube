import { Router } from 'express';
import MatchesService from '../services/Matches.service';
import MatchesController from '../controllers/Matches.controller';
import MatchesModel from '../models/Matches.model';

const MatchesRoutes = Router();

const matchesController = new MatchesController(new MatchesService(MatchesModel));

MatchesRoutes.get('/Matches', (req, res) => matchesController.getAllMatches(req, res));

export default MatchesRoutes;
