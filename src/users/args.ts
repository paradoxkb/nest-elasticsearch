import { Min, MinLength } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UserArgs {
    @Field()
    @MinLength(5)
    username: string

    @Field()
    @MinLength(6)
    password: string

    @Field()
    @MinLength(5)
    name: string

    @Field()
    @Min(18)
    age: number
}
