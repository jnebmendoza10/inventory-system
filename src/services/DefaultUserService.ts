import { User } from '../models/base/User';
import { UserRepository } from '../repositories/base/UserRepository';
import { UserService } from './base/UserService';
import { PasswordService } from './external/PasswordService';
import { PasswordsNotMatchError } from './errors/PasswordsNotMatchError';
import { UserNameAlreadyExistsError } from './errors/UserNameAlreadyExistsError';
import { InvalidUsernamePasswordError } from './errors/InvalidUsernamePasswordError';
import { omit } from 'lodash';

export class DefaultUserService implements UserService {
    constructor(private readonly userRepository: UserRepository, private readonly passwordService: PasswordService) {}
    async createUser(user: Partial<User>): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const result = await this.userRepository.getUserByUsername(user.username!);
        if (!(result === null)) {
            throw new UserNameAlreadyExistsError();
        }

        const newUser = {
            name: user.name,
            role: user.role,
            username: user.username,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            password: await this.passwordService.hash(user.password!),
        };
        await this.userRepository.createUser(newUser);
    }

    async changePassword(id: string, oldPassword: string, newPassword: string): Promise<void> {
        const result = await this.userRepository.getUserById(id);
        const matchedPasswords = await this.passwordService.compare(oldPassword, result.password);
        if (!matchedPasswords) {
            throw new PasswordsNotMatchError();
        }
        await this.userRepository.editPassword(id, await this.passwordService.hash(newPassword));
    }

    async userLogin(userName: string, password: string): Promise<Partial<User>> {
        const user = await this.userRepository.getUserByUsername(userName);
        if (user === null) {
            throw new InvalidUsernamePasswordError();
        }
        const hashedPassword = user.password;

        const matchedPasswords = await this.passwordService.compare(password, hashedPassword);

        if (!matchedPasswords) {
            throw new InvalidUsernamePasswordError();
        }
        const result = omit(user, ['password']);
        return result;
    }

    async retrieveUsers(): Promise<User[]> {
        const result = await this.userRepository.getAllUsers();
        return result;
    }
}
