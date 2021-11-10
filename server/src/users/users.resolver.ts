import { Args, Query, Resolver } from '@nestjs/graphql';
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
}
