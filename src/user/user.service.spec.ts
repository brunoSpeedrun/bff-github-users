import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { GithubService } from '../github/github.service';
import { GithubModule } from '../github/github.module';
import { User } from './interfaces/user.interface';
import { UserRepository } from './user.repository';
import { UserModule } from './user.module';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  const githubMock = [
    {
      login: 'Augusto',
      email: 'augusto.oliveira',
    },
  ];
  const UserMock = [
    {
      login: 'Oliveira',
      email: 'Oliveira@hotmail.com',
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
    verifcacao(login: string): Promise<User> {
      return new Promise(resolve => {
        const user = this.mock.find(t => t.login === login);
      });
    },
  };

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [UserModule, GithubModule],
      providers: [UserService, GithubService, UserRepository],
    })
      .overrideProvider(UserRepository)

      .useValue(githuServicebMock)
      .compile();

    userService = testingModule.get(UserService);
    userRepository = testingModule.get(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should find by login ', async () => {
    const login = 'Augusto';
    const user = await userService.findByUserName(login);
    expect(user).toBeDefined();
    expect(user.login).toBe('Augusto');
  });
  it('should ', async () => {
    const newRepository = {
      login: 'Augusto',
      name: 'Guto',
    };

    const UserAdded = await userService.verificação(newRepository.login);
    expect(UserAdded).toBeDefined();
    expect(UserAdded.login).toBe(newRepository.login);
  });
});
