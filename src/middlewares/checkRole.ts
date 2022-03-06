import { NextFunction, Request, Response } from 'express';
import { Role } from '../models/enums/Role';

export function checkRoleAdmin(req: Request, res: Response, next: NextFunction) {
    const role = res.locals.jwtPayload.role;
    if (!(role === Role.Admin)) {
        res.status(403).json({ title: 'Forbidden', message: 'This request requires admin role' });
    }
    next();
}

export function checkRoleCustomer(req: Request, res: Response, next: NextFunction) {
    const role = res.locals.jwtPayload.role;
    if (!(role === Role.Customer)) {
        res.status(403).json({ title: 'Forbidden', message: 'This request is for customer role only' });
    }
    next();
}

export function checkRoleAdminCustomer(req: Request, res: Response, next: NextFunction) {
    const role = res.locals.jwtPayload.role;
    if (!(role === Role.Customer || Role.Admin)) {
        res.status(403).json({ title: 'Forbidden', message: 'You are not authorized to do changes' });
    }
    next();
}
