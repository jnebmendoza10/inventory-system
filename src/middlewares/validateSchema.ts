import { NextFunction, Request, Response } from 'express';
import * as Validators from '../middlewares/validators/validators';

export function validateSchema(validator: string) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const validated = await Validators[validator as keyof typeof Validators].validateAsync(req.body);
            req.body = validated;
            next();
        } catch (error: any) {
            next(error);
            if (error.isJoi) {
                res.status(422).json({ title: error.name, message: error.message });
            }
        }
    };
}
