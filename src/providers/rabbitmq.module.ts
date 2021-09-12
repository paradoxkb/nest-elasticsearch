import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { Module } from '@nestjs/common';
import { NRabbitMqConfig } from '../configs/rabbitmq';

@Module({
    imports: [
        RabbitMQModule.forRoot(RabbitMQModule, NRabbitMqConfig.mainConfig)
    ],
    providers: [],
    exports: [RabbitMQModule]
})
export class RabbitMQMessageModule { }
