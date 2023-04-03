import { Router } from 'express';
import Users from '../database/models/UsersModel';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';
import loginMiddleware from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';

const loginRouter = Router();
const loginService = new LoginService(Users);
const loginController = new LoginController(loginService);

loginRouter.post('/', loginMiddleware, loginController.login);
loginRouter.get('/role', validateToken, loginController.getRole);

export default loginRouter;
