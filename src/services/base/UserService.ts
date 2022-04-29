import { User } from '../../models/base/User';

export interface UserService {
    createUser(user: Partial<User>): Promise<void>;
    changePassword(id: string, oldPassword: string, newPassword: string): Promise<void>;
    userLogin(userName: string, password: string): Promise<Partial<User>>;
    retrieveUsers(): Promise<Partial<User[]>>;
}
