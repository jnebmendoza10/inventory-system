import { Role } from "../../../src/models/enums/Role";
import { UserModel } from "../../../src/models/sequelize/UserSequelize";
import { SqlUserRepository } from "../../../src/repositories/SqlUserRepository"
import { UserNotFoundError } from "../../../src/repositories/UserNotFoundError";



describe('SqlUserRepository tests', () => {

    let userRepository : SqlUserRepository

    beforeEach(() => {
        userRepository = new SqlUserRepository();
    })
    describe('createUser () - ', () => {
        it('should successfully create a user', async () => {
            UserModel.create = jest.fn();
            const mockedUser = {
                name: 'Benj',
                role: Role.Customer,
                username: 'naruto', 
                password:'123'
            }
            await userRepository.createUser(mockedUser);

            expect(UserModel.create).toBeCalledTimes(1);
            expect(UserModel.create).toBeCalledWith(mockedUser);
            
        })
    })

    describe('getAllUsers () - ', () => {
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
            UserModel.findAll = jest.fn().mockResolvedValue(dummyUsers);
            const users = await userRepository.getAllUsers();

            expect(users).toEqual(dummyUsers);
            expect(UserModel.findAll).toBeCalledTimes(1);
            
        })
    })
    describe('getUserByUsername () - ', () => {
        it('should successfully retrieve user by username', async () => {
            const mockedUser = {
                name: 'Benj',
                role: Role.Customer,
                username: 'naruto', 
            }
            UserModel.findOne = jest.fn().mockResolvedValue(mockedUser);
            const user = await userRepository.getUserByUsername(mockedUser.username);

            expect(user).toEqual(mockedUser);
            expect(UserModel.findOne).toBeCalledTimes(1);
            expect(UserModel.findOne).toBeCalledWith({where: {username: mockedUser.username}});
            
        })

        it('should throw an UserNotFoundError if user does not exist', async () => {
            const mockUsername = 'naruto';
            UserModel.findOne = jest.fn().mockResolvedValue(null);

            await expect(userRepository.getUserByUsername(mockUsername)).rejects.toThrowError(UserNotFoundError);
            
        })
    })
    describe('getUserById () - ', () => {
        it('should successfully retrieve user by id', async () => {
            const id = '1';
            const mockedUser = {
                name: 'Benj',
                role: Role.Customer,
                username: 'naruto', 
            }
            UserModel.findOne = jest.fn().mockResolvedValue(mockedUser);
            const user = await userRepository.getUserById(id);

            expect(user).toEqual(mockedUser);
            expect(UserModel.findOne).toBeCalledTimes(1);
            expect(UserModel.findOne).toBeCalledWith({where: {id: id}});
            
        })

        it('should throw an UserNotFoundError if user does not exist', async () => {
            const mockUserId = '1';
            UserModel.findOne = jest.fn().mockResolvedValue(null);

            await expect(userRepository.getUserByUsername(mockUserId)).rejects.toThrowError(UserNotFoundError);
            
        })
    })
    describe('editPassword () - ', () => {
        it('should successfully edit the password', async () => {
            const id = '1';
            const newPassword = '123';

            UserModel.update = jest.fn();

            await userRepository.editPassword(id, newPassword);

            expect(UserModel.update).toBeCalledTimes(1);
            expect(UserModel.update).toBeCalledWith({ password: newPassword }, { where: { id: id } });
        })
    })
})