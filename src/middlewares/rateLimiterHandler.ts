import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const options = {
    points: 5,
    duration: 1,
    blockDuration: 300,
};
const rateLimiter = new RateLimiterMemory(options);

export async function rateLimiterHandler(req: Request, res: Response, next: NextFunction) {
    rateLimiter
        .consume(req.ip)
        .then(() => next())
        .catch((error) => next(error));
}
