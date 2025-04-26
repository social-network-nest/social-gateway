import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
    ) {}

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

    async list() {
        return this.postClient.send({ cmd: 'list' }, {});
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

    async find(
        authorization: string,
        id: string,
    ) {
        await this.accessToken(authorization);
        return this.postClient.send({ cmd: 'find' }, id);
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

    delete(id: string) {
        return this.postClient.send({ cmd: 'delete' }, id);
    }
}
