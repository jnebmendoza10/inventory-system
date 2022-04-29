import { validateJwt } from "../../../src/middlewares/validateJwt";
import { NextFunction, request, Request, response, Response } from 'express';
import { mockClear, mockReset } from "jest-mock-extended";
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Role } from "../../../src/models/enums/Role";


dotenv.config();

jest.mock('jsonwebtoken');
jest.mock("../../../src/middlewares/validateJwt");
const mockJwt = jwt as jest.Mocked<typeof jwt>;

describe('validateJwt () - ', () =>{
    
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();
    
    beforeEach(() => {
        mockClear(nextFunction);
        //mockReset(nextFunction);
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals:{
                jwtPayload:{}
            }
        }
        jest.clearAllMocks();
        

    })
    
    it('should successfully validate the JWT', () => {
    
        mockRequest = {
            headers: {}
        }
        mockRequest.headers['authorization'] = 'Bearer: 12352554252522342';

        const authHeader = mockRequest.headers['authorization'];
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.PRIVATE_KEY;
        const payload = {
            id: '2',
            name: 'benj',
            role: Role.Customer
        }
        mockJwt.verify.mockImplementationOnce(() => { return payload });
        mockResponse.locals.jwtPayload = payload;
        
        validateJwt(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)

        expect(nextFunction).toBeCalledTimes(1);
        expect(mockJwt.verify).toBeCalledTimes(1);
        expect(mockJwt.verify).toBeCalledWith(token, secretKey);
    })
})