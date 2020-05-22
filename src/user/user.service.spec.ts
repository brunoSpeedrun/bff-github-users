import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { GithubService } from '../github/github.service';
import { User } from './interfaces/user.interface';
import { UserRepository } from './user.repository';

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
  it('mongo = null e git === null', async () => {
    const repo = {
      login: '',
      name: '',
    };

    const bRnull = await userService.verificacao(repo.login);

    expect(bRnull).toBeUndefined();
  });
});
