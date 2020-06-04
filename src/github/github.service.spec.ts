import { Test } from '@nestjs/testing';
import { GithubService } from './github.service';
import { AxiosResponse } from 'axios';
import { HttpModule, HttpService } from '@nestjs/common';
import { Observable, of } from 'rxjs';

describe('GithubService', () => {
  let githubService: GithubService;

  const httpServiceMock = {
    get(url: string): Observable<AxiosResponse<any>> {
      const response = {
        data: {
          login: 'test',
          id: '',
          nomdeid: '',
          name: '',
          htmlurl: '',
          reposurl: '',
          updatedat: '',
          createdat: '',
          email: '',
        },
        headers: {},
        config: { url: url },
        status: 200,
        statusText: 'OK',
      };
      return of(response);
    },
  };

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [GithubService, HttpService],
    })
      .overrideProvider(HttpService)
      .useValue(httpServiceMock)
      .compile();

    githubService = testingModule.get(GithubService);
  });

  it('should be defined', () => {
    expect(githubService).toBeDefined();
  });

  it('should look for user in github', async () => {
    const user = await githubService.findByUsername('test');

    expect(user.login).toBe('test');
  });
  it('must search the users repository on github', async () => {
    jest.spyOn(httpServiceMock, 'get').mockImplementationOnce(url => {
      const response = {
        data: [
          {
            id: '',
            nomdeid: '',
            name: '',
            htmlurl: '',
            fullname: '',
            owner: {
              login: 'test',
            },
          },
        ],

        headers: {},
        config: { url: url },
        status: 200,
        statusText: 'OK',
      };
      return of(response);
    });

    const result = {
      login: 'test',
      name: '',
    };
    const repo = await githubService.searchingForRepository(result.login);
    expect(repo).toBeInstanceOf(Array);
  });
});
