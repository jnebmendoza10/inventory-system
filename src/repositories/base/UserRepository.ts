import { User } from '../../models/base/User';

export interface UserRepository {
    createUser(user: Partial<User>): Promise<void>;
    getAllUsers(): Promise<User[]>;
    getUserByUsername(userName: string): Promise<User>;
    getUserById(id: string): Promise<User>;
    editPassword(id: string, newPassword: string): Promise<void>;
}
