import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field()
    @IsNotEmpty()
    id: number;

    @Field()
    @IsNotEmpty()
    username: string;

    @Field()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsNotEmpty()
    password: string;
}