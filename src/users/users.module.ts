import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';

// const elasticSeachUrl: string = ''http://localhost:9200''
const elasticSeachUrl: string = 'http://1922-78-26-206-247.ngrok.io'

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
      ElasticsearchModule.registerAsync({
          useFactory: () => ({
              node: elasticSeachUrl
          })
      })
  ]
})
export class UsersModule {}
