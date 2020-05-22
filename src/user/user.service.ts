import { Injectable } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private githubService: GithubService,
    private userDB: UserRepository,
  ) {}

  async findByUserName(username: string) {
    return await this.githubService.findByUsername(username);
  }

  async verificação(username: string) {
    const mongo = await this.userDB.findByUserNameMongo(username);

    const git = await this.githubService.findByUsername(username);

    if (mongo != null) {
      return mongo;
    } else if (mongo === null && git != null) {
      return await this.userDB.create(git);
    }
  }
}
