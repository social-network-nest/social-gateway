import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
    ) {}

    list() {
        return this.postClient.send({ cmd: 'list' }, {});
    }

    create(payload: any) {
        return this.postClient.send({ cmd: 'create' }, payload);
    }

    find(id: string) {
        return this.postClient.send({ cmd: 'find' }, id);
    }

    update(payload: any) {
        return this.postClient.send({ cmd: 'update' }, payload);
    }

    delete(id: string) {
        return this.postClient.send({ cmd: 'delete' }, id);
    }
}
