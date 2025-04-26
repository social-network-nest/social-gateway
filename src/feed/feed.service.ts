import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FeedService {
    constructor(
        @Inject('FEED_SERVICE') private readonly feedClient: ClientProxy,
    ) {}

    list() {
        return this.feedClient.send({ cmd: 'list' }, {});
    }

    create(payload: any) {
        return this.feedClient.send({ cmd: 'create' }, payload);
    }

    find(id: string) {
        return this.feedClient.send({ cmd: 'find' }, id);
    }

    update(payload: any) {
        return this.feedClient.send({ cmd: 'update' }, payload);
    }

    delete(id: string) {
        return this.feedClient.send({ cmd: 'delete' }, id);
    }
}
