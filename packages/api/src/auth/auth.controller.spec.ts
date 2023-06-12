import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/auth.dto";

describe("AuthController", () => {
  let controller: AuthController;
  const mockAuthService = {
    signup: jest.fn((dto: SignupDto) => {
      return {
        email: dto.email,
        id: 1,
        token: "user_token",
      };
    }),
    login: jest.fn(() => {
      return {
        token: "user_token",
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [UserModule],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("signup", () => {
    it("should create new user", async () => {
      const mock = { email: "test@test.com", password: "test" };
      expect(await controller.signup(mock)).toEqual({
        id: expect.any(Number),
        email: mock.email,
        token: "user_token",
      });
      expect(mockAuthService.signup).toHaveBeenCalledWith(mock);
    });
  });

  describe("login", () => {
    it("should return a token", async () => {
      const mock = { email: "test@test.com", password: "test" };
      expect(await controller.login(mock)).toEqual({
        token: "user_token",
      });
      expect(mockAuthService.login).toHaveBeenCalledWith(mock);
    });
  });
});
