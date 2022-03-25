import { NextFunction, Request, Response } from 'express';
import { User } from '../models/base/User';
import { UserService } from '../services/base/UserService';
import { Logger } from '../utils/Logger';

export class UserController {
    constructor(private readonly userService: UserService, private readonly logger: Logger) {}

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, role, username, password } = req.body;
            const user: Omit<User, 'id'> = {
                name: name,
                role: role,
                username: username,
                password: password,
            };

            await this.userService.createUser(user);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error: any) {
            this.logger.error('Failed to create a user', error);
            next(error);
        }
    };

    retrieveUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.retrieveUsers();

            res.status(200).json(users);
        } catch (error: any) {
            this.logger.error('Failed to retrieve users', error);
            next(error);
        }
    };

    changePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.jwtPayload.id;
            const { oldpassword, newPassword } = req.body;
            await this.userService.changePassword(userId, oldpassword, newPassword);

            res.status(200).json({ message: 'Password updated successfully' });
        } catch (error: any) {
            this.logger.error('Failed to change password', error);
            next(error);
        }
    };
}
