import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function validateJwt(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = <string>req.headers['authorization'];
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const secretKey = process.env.PRIVATE_KEY;
            const payload = jwt.verify(token, secretKey as string);
            res.locals.jwtPayload = payload;
            next();
        } else {
            res.status(401).json({ title: 'Unauthorized', message: 'Invalid token' });
        }
    } catch (error: any) {
        res.status(403).json({ title: error.title, message: error.message });
    }
}
