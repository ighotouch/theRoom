import { Router } from 'express';
import FixedController from './app/controllers/FixedController';
import RandomController from './app/controllers/RandomController';
import UserController from './app/controllers/UserController';

const apiV1Router = Router();


// Auth
apiV1Router.post('/auth/login', UserController.login);
apiV1Router.post('/auth/register', UserController.register);


apiV1Router.get('/jokes', FixedController.getJokes);
apiV1Router.get('/anime', RandomController.getAnime);



export default apiV1Router;