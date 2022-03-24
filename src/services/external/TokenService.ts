export interface TokenService {
    sign(payload: string | object | Buffer, secret: string, expiration: string | number): string;
}
