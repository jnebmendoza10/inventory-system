import { UserService } from '../services/base/UserService';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthController {
    constructor(private readonly userService: UserService) {}

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;
            const user = await this.userService.userLogin(username, password);
            const secretKey = process.env.PRIVATE_KEY;
            const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, secretKey as string, {
                expiresIn: '1h',
                algorithm: 'HS256',
            });

            res.status(200).send(token);
        } catch (error) {
            next(error);
        }
    };

    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const secretKey = process.env.PUBLIC_KEY;
            const token = jwt.sign(
                { id: res.locals.jwtPayload.id, name: res.locals.jwtPayload.name, role: res.locals.jwtPayload.role },
                secretKey as string,
                {
                    expiresIn: '1h',
                    algorithm: 'HS256',
                },
            );

            res.status(200).send(token);
        } catch (error) {
            next(error);
        }
    };
}
