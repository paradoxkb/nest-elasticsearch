import { AppService } from '../app.service';
import { UsersService } from './users.service';
import { User } from '../graphql';
export declare class UsersResolver {
    private readonly appService;
    private service;
    constructor(appService: AppService, service: UsersService);
    getUsers(filter: Partial<User>): Promise<User[]>;
    createUser(userData: User): Promise<User>;
    updateUser(id: string, data: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<any>;
}
