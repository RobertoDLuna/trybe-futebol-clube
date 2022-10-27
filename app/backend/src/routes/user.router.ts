import { Router } from 'express';
import UserModel from '../database/models/user.model';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';

const UserRoutes = Router();

const userController = new UserController(new UserService(UserModel));

UserRoutes.post('/login', (req, res) => { userController.login(req, res); });
UserRoutes.get('/login/validate', (req, res) => { userController.validateLogin(req, res); });

export default UserRoutes;
