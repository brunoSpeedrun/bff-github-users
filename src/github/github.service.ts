import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class GithubService {
  constructor(private httpService: HttpService) {}

  findByUsername(username: string) {
    const uri = process.env.GITHUB_API;
    const url = `${uri}/users/${username}`;
    return this.httpService
      .get(url)
      .toPromise()
      .then(res => {
        const result = res.data;
        const campos = {
          login: result.login,
          id: result.id,
          node_id: result.node_id,
          name: result.name,
          html_url: result.html_url,
          repos_url: result.repos_url,
          updated_at: result.updated_at,
          created_at: result.created_at,
          email: result.email,
        };

        return campos;
      });
  }
}
