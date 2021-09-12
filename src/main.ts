import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// const app = await NestFactory.createMicroservice(AppModule, {
	// 	transport: Transport.RMQ,
	//
	// 	options: {
	// 		urls: ['amqp://localhost:5672'],
	// 		queue: 'archi_queue',
	// 		queueOptions: {
	// 			durable: false
	// 		}
	// 	}
	// })
	app.enableCors();
	await app.listen(process.env.PORT || 3001);
}
bootstrap();
