import { Injectable } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private githubService: GithubService,
    private userDB: UserRepository,
    private repositorioDB: UserRepository,
  ) {}

  async verificacao(username: string) {
    const mongo = await this.userDB.findByUserNameMongo(username);

    if (mongo != null) {
      return mongo;
    }
    const git = await this.githubService.findByUsername(username);
    return await this.userDB.create(git);
  }
  async findRepo(login: string) {
    const mongo = await this.repositorioDB.findByRepoMongo(login);

    if (mongo.length > 0) {
      return mongo;
    }
    const git = await this.githubService.searchingForRepository(login);
    return await this.repositorioDB.createRepo(git);
  }
}
