import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
        private readonly authService: AuthService,
    ) {}

    async create(authorization: string, payload: any) {
        const token = authorization?.replace('Bearer ', '');
        if (!token) throw new UnauthorizedException('No token provided');

        const {user_id} = await this.authService.validateToken(token);
        payload.userId = user_id;

        return this.postClient.send({ cmd: 'create' }, payload);
    }

    async list() {
        return this.postClient.send({ cmd: 'list' }, {});
    }
}
