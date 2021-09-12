import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import config from '../configs'

@Module({
    imports: [
        ElasticsearchModule.register({
            node: config.elasticSearchUrl
        })
    ],
    exports: [ElasticsearchModule]
})
export class ElasticsearchLocalModule { }