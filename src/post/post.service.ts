import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
        private readonly authService: AuthService,
    ) {}

    async accessToken(authorization: string) {
        const token = authorization?.replace('Bearer ', '');
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        return await this.authService.validateToken(token);
    }

    async list(authorization: string) {
        await this.accessToken(authorization);
        return this.postClient.send({ cmd: 'list' }, {});
    }

    async create(authorization: string, payload: any) {
        const {user_id} = await this.accessToken(authorization);
        payload.userId = user_id;

        return this.postClient.send({ cmd: 'create' }, payload);
    }
}
