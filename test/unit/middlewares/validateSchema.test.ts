import { NextFunction, request, Request, response, Response } from 'express';
import { mockClear, mockReset } from 'jest-mock-extended';
import { validateSchema } from '../../../src/middlewares/validateSchema';
import * as Validators from '../../../src/middlewares/validators/validators';
import { Role } from '../../../src/models/enums/Role';

jest.mock('../../../src/middlewares/validators/validators');
const mockProductValidator = Validators.productValidator as jest.Mocked<typeof Validators.productValidator>;
const mockReviewValidator =  Validators.reviewValidator as jest.Mocked<typeof Validators.reviewValidator>;
const mockUserChangePasswordValidator = Validators.userChangePasswordValidator as jest.Mocked<typeof Validators.userChangePasswordValidator>;
const mockUserLoginValidator = Validators.userLoginValidator as jest.Mocked<typeof Validators.userLoginValidator>;
const mockUserRegistrationValidator = Validators.userRegistrationValidator as jest.Mocked<typeof Validators.userRegistrationValidator>;

const mockValidator = {
    mockProductValidator,
    mockReviewValidator,
    mockUserChangePasswordValidator,
    mockUserLoginValidator,
    mockUserRegistrationValidator
}
describe ('validateSchema test', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    beforeEach(() => {
        mockClear(next);
        mockReset(next);

        jest.clearAllMocks();
        jest.resetAllMocks();

    })
    describe ('product schema', () =>{
        describe ('productValidator () -', () =>{
            it('should sucessfully validate a product schema', async() =>{
                res.status = jest.fn().mockReturnThis();
                res.json = jest.fn()
                const validator = 'productValidator';
                
                req.body = {
                    product: 'Safeguard',
                    quantity: 2
                }
                
                mockValidator.mockProductValidator.validateAsync.mockResolvedValueOnce(req.body);
                
                await validateSchema(validator)(req, res, next);
                
                expect(next).toBeCalledTimes(1);
                expect( mockValidator.mockProductValidator.validateAsync).toBeCalledTimes(1);
                expect( mockValidator.mockProductValidator.validateAsync).toBeCalledWith(req.body);
              
            })

           
        })
    })

    describe ('review schema', () =>{
        describe ('reviewValidator () -', () =>{
            it('should sucessfully validate a review schema', async() =>{
                res.status = jest.fn().mockReturnThis();
                res.json = jest.fn()
                const validator = 'reviewValidator';
                
                req.body = {
                    comment: 'so good'
                }
                
                mockValidator.mockProductValidator.validateAsync.mockResolvedValueOnce(req.body);
                
                await validateSchema(validator)(req, res, next);
                
                expect(next).toBeCalledTimes(1);
                expect( mockValidator.mockReviewValidator.validateAsync).toBeCalledTimes(1);
                expect( mockValidator.mockReviewValidator.validateAsync).toBeCalledWith(req.body);
              
            })
        })
    })

    describe ('user schema', () =>{
        describe ('userChangePasswordValidator () -', () =>{
            it('should sucessfully validate a user change password schema', async() =>{
                res.status = jest.fn().mockReturnThis();
                res.json = jest.fn()
                const validator = 'userChangePasswordValidator';
                
                req.body = {
                    password: '123142546457'
                }
                
                mockValidator.mockProductValidator.validateAsync.mockResolvedValueOnce(req.body);
                
                await validateSchema(validator)(req, res, next);
                
                expect(next).toBeCalledTimes(1);
                expect( mockValidator.mockUserChangePasswordValidator.validateAsync).toBeCalledTimes(1);
                expect( mockValidator.mockUserChangePasswordValidator.validateAsync).toBeCalledWith(req.body);
              
            })
        })
        describe ('userLoginValidator () -', () =>{
            it('should sucessfully validate a user login schema', async() =>{
                res.status = jest.fn().mockReturnThis();
                res.json = jest.fn()
                const validator = 'userLoginValidator';
                
                req.body = {
                    username: 'orionje',
                    password: '123142546457'
                }
                
                mockValidator.mockProductValidator.validateAsync.mockResolvedValueOnce(req.body);
                
                await validateSchema(validator)(req, res, next);
                
                expect(next).toBeCalledTimes(1);
                expect( mockValidator.mockUserLoginValidator.validateAsync).toBeCalledTimes(1);
                expect( mockValidator.mockUserLoginValidator.validateAsync).toBeCalledWith(req.body);
              
            })
        })
        describe ('userRegistrationValidator () -', () =>{
            it('should sucessfully validate a user registration schema', async() =>{
                res.status = jest.fn().mockReturnThis();
                res.json = jest.fn()
                const validator = 'userRegistrationValidator';
                
                req.body = {
                    name: 'Benj',
                    role: Role.Customer,
                    username: 'orionje',
                    password: '123142546457'
                }
                
                mockValidator.mockProductValidator.validateAsync.mockResolvedValueOnce(req.body);
                
                await validateSchema(validator)(req, res, next);
                
                expect(next).toBeCalledTimes(1);
                expect( mockValidator.mockUserRegistrationValidator.validateAsync).toBeCalledTimes(1);
                expect( mockValidator.mockUserRegistrationValidator.validateAsync).toBeCalledWith(req.body);
              
            })
        })
    })



})