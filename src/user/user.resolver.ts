import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './dto/create-user.dto';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType)
  async userByUsername(@Args('username') username: string) {
    const user = await this.userService.findByUsername(username);
    return user;
  }
}
