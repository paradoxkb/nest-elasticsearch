import { join } from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { UsersResolver } from './users/users.resolver';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			typePaths: ['./**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class'
			},
			context: ({ req }) => ({ req })
		}),
		UsersModule,
		// ClientsModule.register([
		// 	{
		// 		name: 'ARCHI_SERVICE',
		// 		transport: Transport.RMQ,
		// 		options: {
		// 			urls: ['amqp://localhost:5672'],
		// 			queue: 'users_queue',
		// 			queueOptions: {
		// 				durable: false
		// 			},
		// 		},
		// 	},
		// ]),
	],
	providers: [AppService, UsersResolver],
})
export class AppModule {
	// configure(consumer: MiddlewareConsumer){
	// 	consumer.apply(AuthMiddleware).forRoutes('*')
	// }
}
