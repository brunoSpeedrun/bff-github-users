import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { GithubService } from '../github/github.service';
import { GithubModule } from '../github/github.module';
import { User } from './interfaces/user.interface';

describe('UserService', () => {
  let userService: UserService;

  const githubMock = [
    {
      login: 'Augusto',
      email: 'augusto.oliveira',
    },
  ];
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
      imports: [GithubModule],
      providers: [UserService, GithubService],
    })
      .overrideProvider(GithubService)
      .useValue(githuServicebMock)
      .compile();

    userService = testingModule.get(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should find by sku ', async () => {
    const login = 'Augusto';
    const user = await userService.findByUsername(login);
    expect(user).toBeDefined();
    expect(user.login).toBe('Augusto');
  });
});
