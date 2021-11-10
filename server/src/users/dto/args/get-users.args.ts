import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray } from "class-validator";

@ArgsType()
export class GetUsersArgs {
    @Field(() => [Number])
    @IsArray()
    ids: number[];
}