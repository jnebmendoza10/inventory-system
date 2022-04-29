import { NextFunction, request, Request, response, Response } from "express";
import { mock, mockClear, mockReset } from "jest-mock-extended"
import { UserController } from "../../../src/controllers/UserController";
import { Role } from "../../../src/models/enums/Role";
import { UserService } from "../../../src/services/base/UserService"
import { Logger } from "../../../src/utils/Logger";


describe('UserController tests', () => {
   
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const mockUserService = mock<UserService>();
    const mockLogger = mock<Logger>();

    let userController : UserController;

    beforeEach(() => {
        mockReset(mockUserService);
        mockClear(mockUserService);

        mockReset(mockLogger);
        mockClear(mockLogger);

        mockReset(next);
        mockClear(next);

        jest.resetAllMocks();
        
        userController = new UserController(mockUserService, mockLogger);
    })

    describe('createUser () - ', () => {
        it('should successfully create a user', async () => {
        
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            req.body = {
                name: 'benj', 
                role: Role.Customer,
                username: 'naruto', 
                password:'123'
            }
            const {name, role, username, password} = req.body;

            const dummyUser = {
                name: name, 
                role: role,
                username: username, 
                password:password
            };

            await userController.createUser(req, res, next)

            expect(next).toBeCalledTimes(0);
            expect(mockUserService.createUser).toBeCalledTimes(1);
            expect(mockUserService.createUser).toBeCalledWith(dummyUser);
            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledTimes(1);
            expect(res.json).toBeCalledWith({ message: 'User registered successfully' })
        })

        it('should call next function if the system failed to create a user', async () => {
            req.body = {name: 'idk'};
            const error = new Error();

            mockUserService.createUser.mockRejectedValueOnce(error);
            
            await userController.createUser(req, res, next);
           
           expect(mockUserService.createUser).toBeCalledTimes(1);
           expect(mockUserService.createUser).toBeCalledWith(req.body);
           expect(mockLogger.error).toBeCalledTimes(1);
           expect(mockLogger.error).toBeCalledWith('Failed to create a user', error);
           expect(next).toBeCalledTimes(1);
           expect(next).toBeCalledWith(error);

        })
    })

    describe('retrieve users () - ', () => {
        it('should successfully retrieve the users', async () => {

            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();

            const dummyUsers = [{
                id: '1', 
                name: 'benj', 
                role: Role.Customer,
                username: 'naruto',
                password: '123',
           },{
                id: '2', 
                name: 'lala', 
                role: Role.Customer,
                username: 'sasuke',
                password: '123'
           }];

          mockUserService.retrieveUsers.mockResolvedValueOnce(dummyUsers);

          await userController.retrieveUsers(req, res, next);

           expect(next).toBeCalledTimes(0);
           expect(mockUserService.retrieveUsers).toBeCalledTimes(1);
           expect(res.status).toBeCalledTimes(1);
           expect(res.status).toBeCalledWith(200);
           expect(res.json).toBeCalledTimes(1);
           expect(res.json).toBeCalledWith(dummyUsers);
        })

        it('should call the next function if the system failed to retrieve users', async () => {
            const error = new Error();

            mockUserService.retrieveUsers.mockRejectedValueOnce(error);

            await userController.retrieveUsers(req, res, next);

            expect(mockUserService.retrieveUsers).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Failed to retrieve users', error);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        })
    })

    describe('changePassword () - ', () => {
        it('should successfully change the password', async () => {
            res.locals = {
                jwtPayload: {
                    id: '2', 
                    name: 'lala', 
                    role: Role.Customer,
                    username: 'sasuke',
                }
            }
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            req.body = { oldPassword: '123', newPassword: '1234'};
            const {oldPassword, newPassword} = req.body
            
            await userController.changePassword(req, res, next);

            expect(next).toBeCalledTimes(0);
            expect(mockUserService.changePassword).toBeCalledTimes(1);
            expect(mockUserService.changePassword).toBeCalledWith(res.locals.jwtPayload.id, oldPassword, newPassword);
            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledTimes(1);
            expect(res.json).toBeCalledWith({message: 'Password updated successfully'});
            
        })

        it('should call the next function if the system cannot change the password', async () => {
            res.locals = {
                jwtPayload: {
                    id: '2', 
                    name: 'lala', 
                    role: Role.Customer,
                    username: 'sasuke',
                }
            }
            const error = new Error();
            req.body = { oldPassword: '123', newPassword: '1234'};
            const {oldPassword, newPassword} = req.body;
            mockUserService.changePassword.mockRejectedValueOnce(error);

            await userController.changePassword(req, res, next);

            expect(mockUserService.changePassword).toBeCalledTimes(1);
            expect(mockUserService.changePassword).toBeCalledWith(res.locals.jwtPayload.id, oldPassword, newPassword);
            expect(mockLogger.error).toBeCalledTimes(1);
            expect(mockLogger.error).toBeCalledWith('Failed to change password', error);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        })
      
    })
})