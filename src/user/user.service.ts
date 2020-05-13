import { Injectable } from '@nestjs/common';
import { GithubService } from '../github/github.service';

@Injectable()
export class UserService {
  constructor(private githubService: GithubService) {}

  findByUsername(username: string) {
    return this.githubService.findByUsername(username);
  }
}
