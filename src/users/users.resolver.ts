import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AppService } from '../app.service';
import { UsersService } from './users.service';
import { User } from '../graphql';
import { UserArgs } from './args';

@Resolver('Users')
export class UsersResolver {
	constructor(
		private readonly appService: AppService,
		private service: UsersService,
	) { }

	@Query()
	async getUsers(@Args(new UserArgs())filter: Partial<User>): Promise<User[]> {
		return this.service.find((<any>filter).filter);
	}

	@Mutation()
	async createUser(@Args('userData')userData: User): Promise<User> {
		return this.service.create(userData);
	}

	@Mutation()
	async updateUser(
		@Args('id')id: string,
		@Args('data')data: Partial<User>
	): Promise<User> {
		return this.service.update(id, data);
	}

	@Mutation()
	async deleteUser(@Args('id')id: string): Promise<any> {
		return this.service.delete(id);
	}
}
