import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
      ElasticsearchModule.registerAsync({
          useFactory: () => ({
              node: 'http://localhost:9200'
          })
      })
  ]
})
export class UsersModule {}
