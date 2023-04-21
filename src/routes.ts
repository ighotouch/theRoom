import { Router } from 'express';
import Joi from 'joi';
import FixedController from './app/controllers/FixedController';
import RandomController from './app/controllers/RandomController';
import UserController from './app/controllers/UserController';
import verifyToken from './app/middlewares/verifyToken';


const apiV1Router = Router();

export const validateSchemaMiddleWare =
    (schema: Joi.ObjectSchema<any>) =>
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const { error, value } = schema.validate({
            ...req.body,
            ...req.params,
            ...req.query
        });
        if (error) {
            return error.details.forEach((e) => {
                res.status(400).json({
                    message: e.message.replace(/['"]/g, '')
                });
            });
        }
        next();
    };

// Auth
apiV1Router.post('/auth/login', validateSchemaMiddleWare(authLoginSchema), UserController.login);
apiV1Router.post('/auth/register', UserController.register);

// resource
apiV1Router.get('/jokes',verifyToken, FixedController.getJokes);
apiV1Router.get('/anime',verifyToken, RandomController.getAnime);

export default apiV1Router;
