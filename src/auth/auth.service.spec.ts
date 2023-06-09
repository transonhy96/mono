import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Signup should be throwing error', () => {
    let data: SignupDto = {
      email: '',
      password: ''
    }
    expect(service.signup(data)).toThrowError();

    data = {
      email: 'test',
      password: ''
    }


    data = {
      email: '',
      password: 'test'
    }
    expect(service.signup(data)).toThrowError();

    data = {
      email: 'test@gmail.com',
      password: ''
    }
    expect(service.signup(data)).toThrowError();
  });
});
