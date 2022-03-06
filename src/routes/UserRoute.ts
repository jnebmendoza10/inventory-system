import { Application } from 'express';
import { UserController } from '../controllers/UserController';
import { checkRoleAdmin, checkRoleAdminCustomer } from '../middlewares/checkRole';
import { validateJwt } from '../middlewares/validateJwt';
import { validateSchema } from '../middlewares/validateSchema';
import { Route } from './Route';

export class UserRoute implements Route {
    constructor(private readonly userController: UserController) {}

    mountRoute(application: Application): void {
        application.post(
            '/api/v1/user/register',
            [validateSchema('userRegistrationValidator')],
            this.userController.createUser,
        );

        application.get('/api/v1/users', [validateJwt, checkRoleAdmin], this.userController.retrieveUsers);

        application.patch(
            '/api/v1/user/editPassword',
            [validateJwt, checkRoleAdminCustomer, validateSchema('userChangePasswordValidator')],
            this.userController.changePassword,
        );
    }
}
