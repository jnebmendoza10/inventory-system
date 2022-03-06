import { mock, mockClear, mockReset } from 'jest-mock-extended';
import { Role } from '../../../src/models/enums/Role';
import { UserRepository } from '../../../src/repositories/base/UserRepository';
import { DefaultUserService } from '../../../src/services/DefaultUserService';
import { PasswordService } from '../../../src/services/external/PasswordService';
import { PasswordsNotMatchError } from '../../../src/services/errors/PasswordsNotMatchError';

describe('DefaultUserService tests', () => {
    const mockUserRepository = mock<UserRepository>();
    const mockPasswordService = mock<PasswordService>();

    let defaultUserService : DefaultUserService;

    beforeEach(() => {
        mockReset(mockUserRepository);
        mockClear(mockUserRepository);

        mockReset(mockPasswordService);
        mockClear(mockPasswordService);

        jest.resetAllMocks();

        defaultUserService = new DefaultUserService(
            mockUserRepository,
            mockPasswordService
        );
    });

    describe('changePassword () - ', () => {
        it('should successfully change the user password', async () => {
            const id = '1';
            const oldPassword = '123';
            const newPassword = '1234';
            const dummyUser = {
                id: '1', 
                name: 'benj', 
                role: Role.Customer,
                username: 'naruto', 
                password:'123'
            };
           
            mockUserRepository.getUserById.mockResolvedValueOnce(dummyUser);
            mockPasswordService.compare.mockResolvedValueOnce(true);
            await defaultUserService.changePassword(id, oldPassword, newPassword);

            expect(mockUserRepository.getUserById).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.getUserById).toBeCalledWith(id);
            expect(mockPasswordService.compare).toHaveBeenCalledTimes(1);
            expect(mockPasswordService.compare).toBeCalledWith(oldPassword, dummyUser.password);
            expect(mockUserRepository.editPassword).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.editPassword).toBeCalledWith(id, mockPasswordService.hash(newPassword));
            
        })

        it('should throw PasswordsNotMatchError when the passwords do not match', async() => {
            const id = '1';
            const oldPassword = '123';
            const newPassword = '1234';
            const dummyUser = {
                id: '1', 
                name: 'benj', 
                role: Role.Customer,
                username: 'naruto', 
                password:'123'
            };
           
            mockUserRepository.getUserById.mockResolvedValueOnce(dummyUser);
            mockPasswordService.compare.mockResolvedValueOnce(false);

            await expect( defaultUserService. changePassword(id, oldPassword, newPassword)).
            rejects.toThrowError(PasswordsNotMatchError);
        })
    })

    describe('userLogin () - ', () => {
        it('login the user successfully', async () => {
            const username = 'naruto';
            const password = '123';
            const dummyUser = {
                id: '1', 
                name: 'benj', 
                role: Role.Customer,
                username: 'naruto', 
                password:'123'
            };

            mockUserRepository.getUserByUsername.mockResolvedValueOnce(dummyUser);
            mockPasswordService.compare.mockResolvedValueOnce(true);
            const result = await defaultUserService.userLogin(username, password);

            expect(result).toBe(dummyUser);
            expect(mockUserRepository.getUserByUsername).toBeCalledTimes(1);
            expect(mockUserRepository.getUserByUsername).toBeCalledWith(username);
        })

        it('should throw PasswordsNotMatchError if the passwords do not match', async() => {
            const username = 'naruto';
            const password = '123';
            const dummyUser = {
                id: '1', 
                name: 'benj', 
                role: Role.Customer,
                username: 'naruto', 
                password:'123'
            };
            
            mockUserRepository.getUserByUsername.mockResolvedValue(dummyUser);
            mockPasswordService.compare.mockResolvedValueOnce(false);

            await expect(defaultUserService.userLogin(username, password)).
            rejects.toThrowError(PasswordsNotMatchError);

        })
    })

    describe('retrieveUsers () -', () => {
        it('should successfully retrieve all users', async () => {
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

           mockUserRepository.getAllUsers.mockResolvedValueOnce(dummyUsers);
           const users = await defaultUserService.retrieveUsers();

           expect(users).toBe(dummyUsers);
           expect(mockUserRepository.getAllUsers).toBeCalledTimes(1);
        })
    })
});