import { NextFunction, request, Request, response, Response } from "express";
import { mock, mockClear, mockReset } from "jest-mock-extended";
import { AuthController } from "../../../src/controllers/AuthController";
import { Role } from "../../../src/models/enums/Role";
import { UserService } from "../../../src/services/base/UserService";
import { TokenService } from "../../../src/services/external/TokenService";
import { Logger } from "../../../src/utils/Logger";
import dotenv from 'dotenv';

dotenv.config();


describe('AuthController tests', () => {
 
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();
    let authController : AuthController;

    const mockUserService = mock<UserService>();
    const mockLogger = mock<Logger>();
    const mockTokenService = mock<TokenService>();

    beforeEach(() => {
        mockReset(mockUserService)
        mockClear(mockUserService)

        mockReset(mockLogger)
        mockClear(mockLogger)

        mockReset(mockTokenService)
        mockClear(mockTokenService)

        mockReset(next)
        mockClear(next)

        jest.resetAllMocks();

        authController = new AuthController(mockUserService, mockTokenService, mockLogger);
    })

    describe('login () - ', () => {
        it('should successfully login a user', async () => {
            req.body = {
                username: 'benj',
                password: '123'
            }
            const {username, password} = req.body;
            const user = {
                id: '1',
                name: 'benj',
                role: Role.Customer
            }
            mockUserService.userLogin.mockResolvedValueOnce(user);
            
            const secretKey = process.env.PRIVATE_KEY;
            mockTokenService.sign.mockReturnValueOnce('12344');
            res.status = jest.fn().mockReturnThis();
            res.send = jest.fn();
            

            await authController.login(req, res, next);

            expect(next).toBeCalledTimes(0);
            expect(mockUserService.userLogin).toBeCalledTimes(1);
            expect(mockUserService.userLogin).toBeCalledWith(username, password);
            expect(mockTokenService.sign).toBeCalledTimes(1);
            expect(mockTokenService.sign).toBeCalledWith({id: user.id, name: user.name, role: user.role}, secretKey, '15m');
            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalledTimes(1);
            expect(res.send).toBeCalledWith('12344');

        })

        it('should call the next function if the system failed to login the user', async () => {
            const error = new Error();
            const dummyUser = {
                username: 'benj',
                password: '123'
            }
            req.body = dummyUser;
           

            mockUserService.userLogin.mockRejectedValueOnce(error);
            await authController.login(req, res, next);

            expect(mockUserService.userLogin).toBeCalledTimes(1);
            expect(mockUserService.userLogin).toBeCalledWith(req.body.username, req.body.password);
            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Failed to login', error);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error)
        })
    })

    describe('refreshToken () - ', () => {
        it('it should successfully get a refresh token when issued', async () => {
            const secretKey = process.env.PRIVATE_KEY;
            res.locals = {
                jwtPayload: {
                    id: '2',
                    name: 'benj',
                    role: Role.Customer
                }
            }
            res.status = jest.fn().mockReturnThis();
            res.send = jest.fn();
            mockTokenService.sign.mockReturnValueOnce('1234');

            await authController.refreshToken(req, res, next);

            expect(next).toBeCalledTimes(0);
            expect(mockTokenService.sign).toBeCalledTimes(1);
            expect(mockTokenService.sign).toBeCalledWith({id: res.locals.jwtPayload.id, name: res.locals.jwtPayload.name, 
                role: res.locals.jwtPayload.role}, secretKey, '1h');
            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalledTimes(1);
            expect(res.send).toBeCalledWith('1234');

        })
    })
})