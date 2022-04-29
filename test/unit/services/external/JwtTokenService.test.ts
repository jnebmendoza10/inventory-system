import * as jwt from 'jsonwebtoken';
import { Role } from '../../../../src/models/enums/Role';
import { JwtTokenService } from '../../../../src/services/external/JwtTokenService';

jest.mock('jsonwebtoken');
const mockJwt = jwt as jest.Mocked<typeof jwt>;

describe('JwtTokenService tests', () => {

    let jwtTokenService : JwtTokenService;
    beforeEach(() => {
        jwtTokenService = new JwtTokenService();
    })

    describe('sign () - ', () => {
        it('should successfully sign the user payload', () => {
            const payload = {
                id: '2', 
                name: 'lala', 
                role: Role.Customer,
                username: 'sasuke',
            };
            const secret = '11242ew23234';
            const expiration = '1h';
            const algorithm = 'HS256';

            mockJwt.sign.mockImplementationOnce(() => { return '3ij423kmjwe2349234' });

            const jwtToken = jwtTokenService.sign(payload, secret, expiration);

            expect(jwtToken).toEqual('3ij423kmjwe2349234');
            expect(mockJwt.sign).toBeCalledTimes(1);
            expect(mockJwt.sign).toBeCalledWith(payload, secret, {expiresIn: expiration, algorithm: algorithm} );
        })
    })
})