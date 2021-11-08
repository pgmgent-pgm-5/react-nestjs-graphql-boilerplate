import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(type => Int)
  id: number;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: true })
  body: string;

  @Field(type => [Post])
  posts: Post[];
}