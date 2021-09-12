
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { User } from '../graphql';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { NRabbitMqConfig } from '../configs/rabbitmq';

@Injectable()
export class UsersService {
	private readonly elasticIndex: string = 'users'

	constructor(
		private readonly elasticsearchService: ElasticsearchService,
		private readonly amqpConnection: AmqpConnection
	) { }

	async create(user: User): Promise<any> {
		const result = await this.elasticsearchService.index({
			index: this.elasticIndex,
			body: user
		})
		await this.publishUserEvent('creating users')
		return this.findById(result.body._id)
	}

	async findById(id: string): Promise<User> {
		const response = await this.elasticsearchService.get({
			id,
			index: this.elasticIndex
		})
		return {
			id,
			...response.body._source
		}
	}

	async find(filter: Partial<User>): Promise<User[]> {
		const params = { index: this.elasticIndex }

		await this.publishUserEvent('getting users')

		if (Object.keys(filter).length) {
			Object.assign(params, {
				body: {
					query: {
						match: filter
					}
				}
			})
		}

		const response = await this.elasticsearchService.search(params)
		const result: User[] = response.body.hits.hits.map(item => ({
			...item._source,
			id: item._id,
		}))
		return result
	}

	async update(id: string, data: Partial<User>): Promise<User> {
		await this.elasticsearchService.update({
			id,
			index: this.elasticIndex,
			body: {
				doc: data
			}
		})
		await this.publishUserEvent('updating users')
		return this.findById(id)
	}

	async delete(id: string): Promise<string> {
		const result = await this.elasticsearchService.delete({
			id,
			index: this.elasticIndex
		})
		await this.publishUserEvent('deleting users')
		return 'ok'
	}

	private async publishUserEvent(msg: string): Promise<void> {
		await this.amqpConnection.publish(
			NRabbitMqConfig.usersBus.exchange,
			<string>NRabbitMqConfig.usersBus.routingKey,
			msg
		)
	}

	@RabbitSubscribe(NRabbitMqConfig.usersBus)
	private async pubSubHandler(msg: { }) {
		console.log(`Received message from exchange: ${msg}`)
		return false
	}
}
