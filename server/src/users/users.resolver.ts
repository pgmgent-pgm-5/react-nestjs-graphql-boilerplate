import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from 'src/blog/models/post.model';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Query(() => User, { name: 'user', nullable: true })
  // getUserById(@Args() getUserArgs: GetUserArgs): User {
  //     return this.usersService.findById(getUserArgs);
  // }

  // @ResolveField('posts', returns => [Post])
  // async getPosts(@Parent() user: User) {
  //   const { id } = user;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
