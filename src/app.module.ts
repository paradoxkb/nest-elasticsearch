import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { UsersResolver } from './users/users.resolver';
import { UsersModule } from './users/users.module';
import { RabbitMQMessageModule } from './providers/rabbitmq.module';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ElasticsearchLocalModule } from './providers/elasticsearch.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			typePaths: ['./**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class'
			},
			introspection: true,
			playground: true,
			context: ({ req }) => ({ req })
		}),
		UsersModule,
		ElasticsearchLocalModule,
		RabbitMQMessageModule,
		ClientsModule.register([
			{
				name: 'Nest_App',
				transport: Transport.TCP,
				options: { port: 5672 },
			},
		])
	],
	providers: [AppService, UsersResolver, AmqpConnection]
})
export class AppModule { }
