import { Router } from 'express';
import UserController from './app/controllers/UserController';

const apiV1Router = Router();


// Auth
apiV1Router.post('/auth/login', UserController.login);
apiV1Router.post('/auth/register', UserController.register);

export default apiV1Router;