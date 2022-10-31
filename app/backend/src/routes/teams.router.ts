import { Router } from 'express';
import TeamsService from '../services/teams.service';
import TeamsController from '../controllers/teams.controller';
import TeamsModel from '../models/teams.model';

const TeamsRoutes = Router();

const teamsController = new TeamsController(new TeamsService(TeamsModel));

TeamsRoutes.post('/teams', (req, res) => teamsController.getAllTeams(req, res));
TeamsRoutes.get('/teams/:id', (req, res) => teamsController.getById(req, res));

export default TeamsRoutes;
