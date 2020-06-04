import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { GithubService } from '../github/github.service';
import { User } from './interfaces/user.interface';
import { UserRepository } from './user.repository';
import { Repository } from './interfaces/repository.interface';

describe('UserService', () => {
  let userService: UserService;

  const githubMock = [
    {
      login: 'Augusto',
      email: 'augusto.oliveira',
    },
  ];

  const repoMock = [
    {
      login: 'Oliveira',
      email: 'Oliveira.augusto',
    },
  ];
  const repositoryServiceMock = {
    mock2: [] = [...repoMock],

    async create(repoMock: any) {
      return Promise.resolve({ ...repoMock });
    },
    async createRepo(repoMock: any) {
      return Promise.resolve({ ...repoMock });
    },
    findByRepoMongo(login: string) {
      return new Promise(resolve => {
        const repo = this.mock2.find(r => r.login === login);

        return resolve(repo);
      });
    },

    findByUserNameMongo(login: string): Promise<User> {
      return new Promise(resolve => {
        const repo = this.mock2.find(r => r.login === login);

        return resolve(repo);
      });
    },
  };

  const githuServicebMock = {
    mock: [] = [...githubMock],

    findByUsername(login: string): Promise<User> {
      return new Promise(resolve => {
        const user = this.mock.find(t => t.login === login);

        return resolve(user);
      });
    },
    searchingForRepository(login: string): Promise<Repository[]> {
      return new Promise(resolve => {
        const repos = this.mock.find(t => t.login === login);

        return resolve(repos);
      });
    },
  };

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [UserService, GithubService, UserRepository],
    })
      .overrideProvider(GithubService)
      .useValue(githuServicebMock)
      .overrideProvider(UserRepository)
      .useValue(repositoryServiceMock)
      .compile();

    userService = testingModule.get(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should ', async () => {
    const repo = {
      login: 'Oliveira',
      name: 'Oliveira.augusto',
    };

    const UserAdded = await userService.verificacao(repo.login);
    expect(UserAdded).toBeDefined();
    expect(UserAdded.login).toBe(repo.login);
  });
  it('should find by login ', async () => {
    const login = 'Augusto';
    const user = await userService.verificacao(login);
    expect(user).toBeDefined();
    expect(user.login).toBe('Augusto');
  });
  it('we should check on the mongo and git', async () => {
    const repo = {
      login: 'Oliveira',
      name: '',
    };

    const bRnull = await userService.verificacao(repo.login);
    expect(bRnull).toBeDefined();
    expect(bRnull.login).toBe(repo.login);
  });
  it('must check if it exists in the mongo', async () => {
    jest
      .spyOn(repositoryServiceMock, 'findByRepoMongo')
      .mockImplementationOnce(() => {
        const mongoRepo = [
          {
            id: 'Oliveira',
            node_id: '',
            name: 'Oliveira.com',
            full_name: '',
            html_url: '',
          },
        ];
        return Promise.resolve(mongoRepo);
      });

    const mongo = {
      id: 'Oliveira',
      name: 'Oliveira.com',
    };

    const repo = await userService.findRepo(mongo.id);
    expect(repo[0].id).toBe(mongo.id);
  });
  it('check if the mongo returns an empty array and look in git ', async () => {
    jest
      .spyOn(repositoryServiceMock, 'findByRepoMongo')
      .mockImplementationOnce(() => {
        const mongoRepo = [];
        return Promise.resolve(mongoRepo);
      });

    const git = {
      login: 'Augusto',
      email: 'augusto.oliveira',
    };
    const repo = await userService.findRepo(git.login);
    expect(repo).toStrictEqual(git);
  });
});
