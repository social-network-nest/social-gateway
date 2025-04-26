import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
        private readonly authService: AuthService,
    ) {}

    async accessToken(
        authorization: string,
    ) {
        const token = authorization?.replace('Bearer ', '');
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        return await this.authService.validateToken(token);
    }

    async createParams(
        authorization: string,
        payload: any,
    ) {
        const {userId} = await this.accessToken(authorization);
        return {
            ...payload,
            userId,
        }
    }

    async list(
        authorization: string,
    ) {
        await this.accessToken(authorization);
        return this.postClient.send({ cmd: 'list' }, {});
    }

    async find(
        authorization: string,
        payload: any,
    ) {
        await this.accessToken(authorization);
        return this.postClient.send({ cmd: 'find' }, payload);
    }

    async create(
        authorization: string,
        payload: any,
    ) {
        const params = await this.createParams(
            authorization,
            payload,
        );
        return this.postClient.send({ cmd: 'create' }, params);
    }

    async update(
        authorization: string,
        payload: any,
    ) {
        const params = await this.createParams(
            authorization,
            payload,
        );
        return this.postClient.send({ cmd: 'update' }, params);
    }

    async delete(
        authorization: string,
        payload: any,
    ) {
        const params = await this.createParams(
            authorization,
            payload,
        );
        return this.postClient.send({ cmd: 'delete' }, params);
    }
}
