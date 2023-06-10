import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/auth.dto";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { HashingService } from "src/hashing/hashing.service";
import { HashingModule } from "src/hashing/hashing.module";
import { JwtModule } from "src/jwt/jwt.module";
import { JwtService } from "src/jwt/jwt.service";
import { AppError } from "src/configs/constants";
import { get_app_exeption } from "src/utils/error";

describe("AuthService", () => {
  let service: AuthService;
  const user_email = "test@test.com";
  const user_password = "test";
  const def_hash = "hash";
  const jwt_token = "token";

  const mockHashService = {
    gen_hash: jest.fn((pass: string) => {
      return def_hash;
    }),
    compare_hash: jest.fn((hash, pass) => {
      return hash === pass;
    }),
  };
  const mockJwtService = {
    sign: jest.fn(() => {
      return jwt_token;
    }),
    decode: jest.fn(() => {
      return jwt_token;
    }),
    verify: jest.fn((token: string) => {
      return token === jwt_token;
    }),
  };
  const userMocks = [
    {
      email: user_email,
      id: 0,
      token: jwt_token,
      password: user_password,
    },
  ];
  const mockUserService = {
    get_user_by_email: jest.fn((email: string) => {
      return userMocks.find((s) => s.email == email);
    }),
    create_user: jest.fn(async (dto: SignupDto) => {
      const index = userMocks.length + 1;
      const new_user = {
        ...dto,
        id: index,
        token: jwt_token,
      };
      userMocks.push(new_user);
      return new_user;
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [UserModule, HashingModule, JwtModule],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(HashingService)
      .useValue(mockHashService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("signup", () => {
    it("should create new user", async () => {
      const mock: SignupDto = {
        email: "test2@test.com",
        password: user_password,
      };
      expect(await service.signup(mock)).toEqual({
        id: expect.any(Number),
        email: mock.email,
        token: jwt_token,
      });
      expect(mockUserService.get_user_by_email).toHaveBeenCalledWith(
        mock.email,
      );
      expect(mockHashService.gen_hash).toHaveBeenCalledWith(mock.password);
      expect(mockUserService.create_user).toHaveBeenCalledWith({
        email: mock.email,
        password: mockHashService.gen_hash(mock.password),
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: mock.email,
        id: expect.any(Number),
      });
    });
    it("should throw already existed user error", async () => {
      const mock: SignupDto = { email: user_email, password: user_password };
      expect(async () => {
        await service.signup(mock);
      }).rejects.toThrow(get_app_exeption(AppError.EMAIL_EXISTED));
      expect(mockUserService.get_user_by_email).toHaveBeenCalledWith(
        mock.email,
      );
    });
  });

  describe("login", () => {
    it("should return user token", async () => {
      const mock: SignupDto = { email: user_email, password: user_password };
      expect(await service.login(mock)).toEqual({
        token: jwt_token,
      });
      expect(mockUserService.get_user_by_email).toHaveBeenCalledWith(
        mock.email,
      );
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: mock.email,
        id: mockUserService.get_user_by_email(mock.email).id,
      });
    });
    it("should throw user not existed error", async () => {
      const mock: SignupDto = {
        email: "random@test.com",
        password: user_password,
      };
      expect(async () => {
        await service.login(mock);
      }).rejects.toThrow(get_app_exeption(AppError.USER_NOT_EXISTED));
      expect(mockUserService.get_user_by_email).toHaveBeenCalledWith(
        mock.email,
      );
    });

    it("should throw generic error", async () => {
      const mock: SignupDto = { email: user_email, password: "random" };
      expect(async () => {
        await service.login(mock);
      }).rejects.toThrow(get_app_exeption(AppError.GENERIC));
      expect(mockUserService.get_user_by_email).toHaveBeenCalledWith(
        mock.email,
      );
    });
  });
});
