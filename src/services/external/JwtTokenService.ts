import { TokenService } from './TokenService';
import * as jwt from 'jsonwebtoken';

export class JwtTokenService implements TokenService {
    sign(payload: string | object | Buffer, secret: string): string {
        const token = jwt.sign(payload, secret, { expiresIn: '1h', algorithm: 'HS256' });
        return token;
    }
}
