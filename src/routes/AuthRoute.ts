import { Application } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateJwt } from '../middlewares/validateJwt';
import { validateSchema } from '../middlewares/validateSchema';
import { Route } from './Route';

export class AuthRoute implements Route {
    constructor(private readonly authController: AuthController) {}

    mountRoute(application: Application): void {
        application.post('/api/v1/auth/login', [validateSchema('userLoginValidator')], this.authController.login);
        application.post('api/v1/auth/refreshToken', [validateJwt], this.authController.refreshToken);
    }
}
