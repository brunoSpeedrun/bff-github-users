import { Injectable, HttpService } from '@nestjs/common';


@Injectable()
export class GithubService {
  constructor(private httpService: HttpService) {}

  findByUsername(username: string) {
    const uri = process.env.GITHUB_API;
    const url = `${uri}/users/${username}`;
    return this.httpService.get(url).toPromise();
  }
}
