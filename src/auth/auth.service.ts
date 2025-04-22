import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
    ) {}

    async validateToken(token: string) {
        const response = await this.authClient
            .send({ cmd: 'verify.token' }, token)
            .toPromise();

        if (!response?.valid || !response.payload) {
            throw new UnauthorizedException('Token is invalid or expired');
        }

        return response.payload;
    }
}
