export declare class UserInput {
    username?: Nullable<string>;
    password?: Nullable<string>;
    name?: Nullable<string>;
    age?: Nullable<number>;
}
export declare class User {
    id: string;
    username: string;
    password?: Nullable<string>;
    name: string;
    age: number;
}
export declare abstract class IMutation {
    abstract createUser(userData?: Nullable<UserInput>): Nullable<User> | Promise<Nullable<User>>;
    abstract updateUser(id?: Nullable<string>, data?: Nullable<UserInput>): Nullable<User> | Promise<Nullable<User>>;
    abstract deleteUser(id?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;
}
export declare abstract class IQuery {
    abstract getUsers(filter?: Nullable<UserInput>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}
declare type Nullable<T> = T | null;
export {};
