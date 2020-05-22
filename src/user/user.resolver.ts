import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  @Query(() => UserType)
  async userByUsername(@Args('username') username: string) {
    return this.userService.findByUserName(username);
  }
  @Query(() => UserType)
  async User() {
    return this.userRepository.findAll();
  }
  @Query(() => UserType)
  async userByUsernameRepo(@Args('username') username: string) {
    return this.userService.verificação(username);
  }
}
