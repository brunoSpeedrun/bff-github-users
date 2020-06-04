import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './dto/create-user.dto';
import { RepositoryType } from './dto/create-repository.dto';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType)
  async getUser(@Args('username') username: string) {
    return this.userService.verificacao(username);
  }

  @ResolveField('repository', () => [RepositoryType])
  async repo(@Parent() user: UserType) {
    const { login } = user;
    return this.userService.findRepo(login);
  }
}
