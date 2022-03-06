import { PasswordService } from './PasswordService';
import * as brcypt from 'bcrypt';

export class BcryptPasswordService implements PasswordService {
    async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        const isMatched = await brcypt.compare(plainPassword, hashedPassword);

        return isMatched;
    }
    async hash(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = await brcypt.genSalt(saltRounds);
        const hashedPassword = await brcypt.hash(password, salt);

        return hashedPassword;
    }
}
