import { ElasticsearchService } from '@nestjs/elasticsearch';
import { User } from '../graphql';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
export declare class UsersService {
    private readonly elasticsearchService;
    private readonly amqpConnection;
    private readonly elasticIndex;
    constructor(elasticsearchService: ElasticsearchService, amqpConnection: AmqpConnection);
    create(user: User): Promise<any>;
    findById(id: string): Promise<User>;
    find(filter: Partial<User>): Promise<User[]>;
    update(id: string, data: Partial<User>): Promise<User>;
    delete(id: string): Promise<string>;
    private publishUserEvent;
    private pubSubHandler;
}
