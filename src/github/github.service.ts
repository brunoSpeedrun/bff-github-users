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
          nomdeid: result.node_id,
          name: result.name,
          htmlurl: result.html_url,
          reposurl: result.repos_url,
          updatedat: result.updated_at,
          createdat: result.created_at,
          email: result.email,
        };

        return campos;
      });
  }
}
