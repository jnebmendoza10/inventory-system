import { User } from '../models/base/User';
import { UserModel } from '../models/sequelize/UserSequelize';
import { UserRepository } from './base/UserRepository';
import { UserNotFoundError } from './UserNotFoundError';

export class SqlUserRepository implements UserRepository {
    async createUser(user: Partial<User>): Promise<void> {
        await UserModel.create(user);
    }
    async getAllUsers(): Promise<User[]> {
        const users = await UserModel.findAll();
        return users;
    }
    async getUserByUsername(userName: string): Promise<User> {
        const user = await UserModel.findOne({ where: { username: userName } });
        if (user === null) {
            return null as any;
        }
        return user;
    }
    async getUserById(id: string): Promise<User> {
        const user = await UserModel.findOne({ where: { id: id } });
        if (user === null) {
            throw new UserNotFoundError();
        }
        return user;
    }
    async editPassword(id: string, newPassword: string): Promise<void> {
        await UserModel.update({ password: newPassword }, { where: { id: id } });
    }
}
