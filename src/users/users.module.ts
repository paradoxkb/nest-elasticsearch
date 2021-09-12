import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RabbitMQMessageModule } from '../providers/rabbitmq.module';
import { ElasticsearchLocalModule } from '../providers/elasticsearch.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
      RabbitMQMessageModule,
      ElasticsearchLocalModule
  ]
})
export class UsersModule {}
