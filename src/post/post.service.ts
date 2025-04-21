import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    ) {}

    async create(authorization: string, payload: any) {
        const token = authorization?.replace('Bearer ', '');
        if (!token) throw new UnauthorizedException('No token provided');

        const tokenValidation = await this.authClient.send({ cmd: 'verify.token' }, token)
            .toPromise();
        if (!tokenValidation.valid) 'Token is invalid or expired'

        return this.postClient.send({ cmd: 'create_post' }, payload);
    }
}
