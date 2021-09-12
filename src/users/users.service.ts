
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { User } from '../graphql';

@Injectable()
export class UsersService {
	private readonly elasticIndex: string = 'users'

	constructor(private readonly elasticsearchService: ElasticsearchService) {

	}

	async create(user: User): Promise<any> {
		const result = await this.elasticsearchService.index({
			index: this.elasticIndex,
			body: user
		})
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
		return this.findById(id)
	}

	async delete(id: string): Promise<string> {
		const result = await this.elasticsearchService.delete({
			id,
			index: this.elasticIndex
		})
		return 'ok'
	}
}
