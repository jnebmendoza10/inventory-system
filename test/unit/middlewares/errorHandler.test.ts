import { NextFunction, Request, request, Response, response } from "express";
import { InvalidRequestError } from "../../../src/controllers/errors/InvalidRequestError";
import { TooManyRequestsError } from "../../../src/controllers/errors/TooManyRequestsError";
import { errorHandler } from "../../../src/middlewares/errorHandler";
import { ProductNotFoundError } from "../../../src/repositories/ProductNotFoundError";
import { InvalidUsernamePasswordError } from "../../../src/services/errors/InvalidUsernamePasswordError";
import { UserNameAlreadyExistsError } from "../../../src/services/errors/UserNameAlreadyExistsError";



describe('errorHandler tests', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    

    it('should send uncontrolled error', () => {
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn()

        const error = new Error('Server Error');
        errorHandler(error, req, res, next);

        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ title: 'Internal Server Error', 
        message: 'Something went wrong' });
    })

    it('should send InvalidRequestError', () => {
        
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn()

        const error = new InvalidRequestError();

        errorHandler(error, req, res, next);

        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ title: error.name, 
        message: error.message });
    })

    it('should send InvalidUserNamePasswordError', () => {
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn()

        const error = new InvalidUsernamePasswordError();

        errorHandler(error, req, res, next);

        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ title: error.name, 
        message: error.message });
    })

    it('should send ProductNotFoundError', () => {
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn()

        const error = new ProductNotFoundError();
        
        errorHandler(error, req, res, next);

        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ title: error.name, 
        message: error.message });
    })

    it('should send UserNameAlreadyExistsError', () => {
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn()

        const error = new UserNameAlreadyExistsError();
        
        errorHandler(error, req, res, next);

        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(409);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ title: error.name, 
        message: error.message });
    })

    it('should send TooManyRequestsError', () => {
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn()

        const error = new TooManyRequestsError();
        
        errorHandler(error, req, res, next);

        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(429);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ title: error.name, 
        message: error.message });
    })

})