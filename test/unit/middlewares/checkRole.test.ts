import { NextFunction, request, Request, response, Response } from 'express';
import { mockClear, mockReset } from "jest-mock-extended";
import { Role } from "../../../src/models/enums/Role";
import { checkRoleAdmin } from "../../../src/middlewares/checkRole";





describe('checkRole () - ', () =>{
    
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();
    
    beforeEach(() => {
        mockClear(nextFunction);
        mockReset(nextFunction);
      
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals:{
                jwtPayload:{}
            }
        }
        
       
        

    })

    describe('Admin Role', () => {
        it('should successfully verify the Admin Role', () => {
    
            mockResponse.locals.jwtPayload.role = Role.Admin;
         
            checkRoleAdmin(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
    
            expect(nextFunction).toBeCalledTimes(1);
         
        })

        it('should send status 403 if the client is not an Admin', () => {
            mockResponse.locals.jwtPayload.role = Role.Customer;
         
            checkRoleAdmin(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
    
            expect(mockResponse.status).toBeCalledTimes(1);
            expect(mockResponse.status).toBeCalledWith(403);
            expect(mockResponse.json).toBeCalledTimes(1);
            expect(mockResponse.json).toBeCalledWith({ title: 'Forbidden', message: 'This request requires admin role' })
        })
    })

    describe('Customer Role', () => {
        it('should successfully verify the Customer Role', () => {
    
            mockResponse.locals.jwtPayload.role = Role.Customer;
         
            checkRoleAdmin(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
    
            expect(nextFunction).toBeCalledTimes(1);
         
        })

      
    })
    
    describe('AdminCustomer Role', () => {
        it('should successfully verify the AdminCustomer Role', () => {
    
            mockResponse.locals.jwtPayload.role = Role.Customer;
         
            checkRoleAdmin(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
    
            expect(nextFunction).toBeCalledTimes(1);
         
        })

    })
    
})