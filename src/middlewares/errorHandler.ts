import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../controllers/errors/InvalidRequestError';
import { NoContentError } from '../controllers/errors/NoContentError';
import { TooManyRequestsError } from '../controllers/errors/TooManyRequestsError';
import { ProductNotFoundError } from '../repositories/ProductNotFoundError';
import { InvalidUsernamePasswordError } from '../services/errors/InvalidUsernamePasswordError';
import { UserNameAlreadyExistsError } from '../services/errors/UserNameAlreadyExistsError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof InvalidRequestError) {
        res.status(400).json({
            title: error.name,
            message: error.message,
        });
    } else if (error instanceof InvalidUsernamePasswordError) {
        res.status(401).json({
            title: error.name,
            message: error.message,
        });
    } else if (error instanceof ProductNotFoundError) {
        res.status(404).json({
            title: error.name,
            message: error.message,
        });
    } else if (error instanceof NoContentError) {
        res.status(204).json({
            title: error.name,
            message: error.message,
        });
    } else if (error instanceof UserNameAlreadyExistsError) {
        res.status(409).json({
            title: error.name,
            message: error.message,
        });
    } else if (error instanceof TooManyRequestsError) {
        res.status(429).json({
            title: error.name,
            message: error.message,
        });
    } else
        res.status(500).json({
            title: 'Internal Server Error',
            message: 'Something went wrong',
        });
}
