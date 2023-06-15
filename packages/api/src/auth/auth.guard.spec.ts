import { Test } from "@nestjs/testing";
import { JwtService } from "src/jwt/jwt.service";
import { UserService } from "src/user/user.service";
import { AuthGuard } from "./auth.guard";
import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext } from "@nestjs/common";
describe("AuthGuard", () => {
  let authGaurd: AuthGuard;
  const valid_token = "valid";
  const users = [
    {
      id: 0,
      email: "test@test.com",
      password: "test",
    },
  ];
  const mockUserService = {
    get_user_by_email: jest.fn(async (email: string) => {
      return users.find((s) => s.email === email);
    }),
  };
  const mockJwtService = {
    verify_header: jest.fn(async (req: any) => {
      if (req.headers["authorization"].split("Bearer ")[1] === valid_token) {
        return {
          email: users[0].email,
          id: users[0].id,
        };
      } else {
        return null;
      }
    }),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthGuard, UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    authGaurd = moduleRef.get<AuthGuard>(AuthGuard);
  });
  it("should be defined", () => {
    expect(authGaurd).toBeDefined();
  });

  describe("canActivate", () => {
    it("should return true", async () => {
      const mockExecutionContext = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: "Bearer " + valid_token,
            },
          }),
        }),
      });
      expect(mockExecutionContext.switchToHttp()).toBeDefined();
      expect(await authGaurd.canActivate(mockExecutionContext)).toBe(true);
    });
    it("should return false", async () => {
      const mockExecutionContext = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: "Bearer " + "random",
            },
          }),
        }),
      });
      expect(mockExecutionContext.switchToHttp()).toBeDefined();
      expect(await authGaurd.canActivate(mockExecutionContext)).toBe(false);
    });

    it("should return false", async () => {
      const mockExecutionContext = createMock<ExecutionContext>({});
      expect(mockExecutionContext.switchToHttp()).toBeDefined();
      expect(await authGaurd.canActivate(mockExecutionContext)).toBe(false);
    });
  });
});
