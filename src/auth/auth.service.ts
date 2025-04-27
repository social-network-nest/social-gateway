import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
    ) {}

    async login(payload: any) {
        return this.authClient.send({ cmd: 'login' }, payload);
    }

    async register(payload: any) {
        return this.authClient.send({ cmd: 'register' }, payload);
    }

    async verifyToken(authorization) {
        const token = authorization?.replace('Bearer ', '');
        if (!token) return { valid: false, message: 'No token provided' };
        return this.authClient.send({ cmd: 'verify.token' }, token);
    }

    async validateToken(token: string) {
        const {valid, decode} = await this.authClient
            .send({ cmd: 'verify.token' }, token)
            .toPromise();
        if (!valid || !decode) {
            throw new UnauthorizedException('Token is invalid or expired');
        }
        return decode;
    }

    async accessToken(authorization: string) {
        const token = authorization?.replace('Bearer ', '');
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        return this.validateToken(token);
    }

    async findUserByEmail(email: string) {
        return this.authClient.send({ cmd: 'find.user.email' }, email);
    }

    async listUsers() {
        return this.authClient.send({ cmd: 'list.users' }, {});
    }
}
