
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UserInput {
    username?: Nullable<string>;
    password?: Nullable<string>;
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class User {
    id: string;
    username: string;
    password?: Nullable<string>;
    name: string;
    age: number;
}

export abstract class IMutation {
    abstract createUser(userData?: Nullable<UserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(id?: Nullable<string>, data?: Nullable<UserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;
}

export abstract class IQuery {
    abstract getUsers(filter?: Nullable<UserInput>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

type Nullable<T> = T | null;
