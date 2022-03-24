import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function validateJwt(req: Request, res: Response, next: NextFunction) {
    const token = <string>req.headers['authorization'];
    const secretKey = process.env.PRIVATE_KEY;
    if (token === null) {
        res.status(403).json({ title: 'Forbidden', message: 'No access token provided' });
    }
    try {
        const payload = jwt.verify(token, secretKey as string);
        res.locals.jwtPayload = payload;
    } catch (error: any) {
        res.status(403).json({ title: error.title, message: error.message });
    }
    next();
}
