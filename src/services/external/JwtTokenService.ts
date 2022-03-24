import { TokenService } from './TokenService';
import * as jwt from 'jsonwebtoken';

export class JwtTokenService implements TokenService {
    sign(payload: string | object | Buffer, secret: string, expiration: string | number): string {
        const token = jwt.sign(payload, secret, { expiresIn: expiration, algorithm: 'HS256' });
        return token;
    }
}
