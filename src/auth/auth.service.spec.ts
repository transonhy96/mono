import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth.dto';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

describe('AuthService', () => {
  let service: AuthService;
  let userMocks = [
    {
      email: 'test@test.com',
      id: 0,
      token: 'token'
    }
  ];
  const mockUserService = {
    get_user_by_email: jest.fn((email: string) => {
      return userMocks.find(s => s.email == email)
    }),
    create_user: jest.fn(async (dto: SignupDto) => {
      let index = userMocks.length + 1;
      return userMocks.push({
        ...dto,
        id: index,
        token: 'token'
      })
    })
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [UserModule]
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("signup", () => {
    it('should create new user', async () => {
      let mock = { email: 'test2@test.com', password: 'test' };
      console.log(userMocks)
      expect(await service.signup(mock)).toEqual(
        {
          id: expect.any(Number),
          email: mock.email,
          token: 'token'
        }
      );
      expect(mockUserService.get_user_by_email).toHaveBeenCalledWith(mock);
      expect(mockUserService.create_user).toHaveBeenCalledWith(mock);
    })
  })
});
