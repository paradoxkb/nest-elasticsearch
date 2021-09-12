import { RabbitHandlerConfig, RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

import config from '../configs'

export namespace NRabbitMqConfig {
    export const usersBus: RabbitHandlerConfig = {
        routingKey: 'users',
        exchange: 'users-exchange',
        queue: 'users-queue',
        type: 'subscribe'
    }

    export const mainConfig: RabbitMQConfig = {
        uri: config.rabbitMqUrl,
        exchanges: [
            {
                name: usersBus.exchange,
                type: 'topic'
            }
        ]
    }
}
