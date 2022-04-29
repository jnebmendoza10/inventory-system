import * as bcrypt from 'bcrypt';
import { BcryptPasswordService } from '../../../../src/services/external/BcryptPasswordService';


jest.mock('bcrypt');
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe ('BcryptPasswordService test', () => {

    let bcryptPasswordService : BcryptPasswordService;

    beforeEach(() => {
        mockBcrypt.compare.mockClear();
        bcryptPasswordService = new BcryptPasswordService();
    })

    describe('compare () - ', () => {
        it('should successfully compare passwords', async () => {
            const plainPassword = 'hello';
            const hashedPassword = '1232144535asdasd';
            mockBcrypt.compare.mockImplementationOnce(() => { return true });
            
            const isMatched = await bcryptPasswordService.compare(plainPassword, hashedPassword);

            expect(isMatched).toBe(true);
            expect(mockBcrypt.compare).toBeCalledTimes(1);
            expect(mockBcrypt.compare).toBeCalledWith(plainPassword, hashedPassword);

        })
    })

    describe('hash () - ', () => {
        it('should successfully hash the password', async () => {
            const saltRounds = 10;
            const password = 'kakashi';
            mockBcrypt.genSalt.mockImplementationOnce(() => { return 'hello' });
            mockBcrypt.hash.mockImplementationOnce(() => { return '143j2k34kmdes2' });;

            const hashedPassword = await bcryptPasswordService.hash(password);

            expect(hashedPassword).toEqual('143j2k34kmdes2');
            expect(mockBcrypt.genSalt).toBeCalledTimes(1);
            expect(mockBcrypt.genSalt).toBeCalledWith(saltRounds);
            expect(mockBcrypt.hash).toBeCalledTimes(1);
            expect(mockBcrypt.hash).toBeCalledWith(password, 'hello');

        })
    })
})