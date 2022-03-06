import { NextFunction, Request, Response } from 'express';
import { User } from '../models/base/User';
import { UserService } from '../services/base/UserService';
import { NoContentError } from './errors/NoContentError';

export class UserController {
    constructor(private readonly userService: UserService) {}

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, role, username, password } = req.body;
            const user: Partial<User> = {
                name: name,
                role: role,
                username: username,
                password: password,
            };

            await this.userService.createUser(user);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            next(error);
        }
    };

    retrieveUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.retrieveUsers();

            users.length > 0 ? res.status(200).json(users) : next(new NoContentError());
        } catch (error) {
            next(error);
        }
    };

    changePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.jwtPayload.id;
            const { oldpassword, newPassword } = req.body;
            await this.userService.changePassword(userId, oldpassword, newPassword);

            res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            next(error);
        }
    };
}
