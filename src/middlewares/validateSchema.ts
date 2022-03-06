import { NextFunction, Request, response, Response } from 'express';
import * as Validators from '../middlewares/validators/validators';

export function validateSchema(validator: string) {
    if (!Validators.hasOwnProperty(validator)) {
        throw new Error(`${validator} does not exist`);
    }
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const validated = await Validators[validator as keyof typeof Validators].validateAsync(req.body);
            req.body = validated;
            next();
        } catch (error: any) {
            next(error);
            if (error.isJoi) {
                res.status(422).json({ title: error.title, message: error.message });
            }
        }
    };
}
