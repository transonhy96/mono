import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/user.dto";
import { get_app_exeption } from "src/utils/error";
import { AppError } from "src/configs/constants";
import { PrismaService } from "src/prisma/prisma.service";

describe("UserService", () => {
  let service: UserService;
  const user_mail = "test@test.com";
  const user_pass = "test";
  interface PrismaFilter {
    where: Record<string, string>;
  }
  interface PrismaData {
    data: CreateUserDto;
  }
  const users = [
    {
      id: 0,
      email: user_mail,
      password: user_pass,
    },
  ] as User[];
  const mockPrismaService = {
    user: {
      findUnique: jest.fn(async (data: PrismaFilter) => {
        return users.find((s) => s.email === data.where.email);
      }),
      create: jest.fn(async (data: PrismaData) => {
        const existed = users.find((s) => s.email === data.data.email);
        if (existed) {
          return Promise.reject(get_app_exeption(AppError.EMAIL_EXISTED));
        }
        const new_user = {
          id: users.length + 1,
          email: data.data.email,
          password: user_pass,
        } as User;
        users.push(new_user);
        return new_user;
      }),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  describe("get_user_by_email", () => {
    it("should return an user", async () => {
      expect(await service.get_user_by_email(user_mail)).toEqual(users[0]);
    });
    it("should return no user", async () => {
      expect(await service.get_user_by_email("nouser@test.com")).toEqual(
        undefined,
      );
    });
  });

  describe("create_user", () => {
    it("should create new user", async () => {
      const mock = {
        email: "admin@test.test",
        password: user_pass,
      } as CreateUserDto;

      expect(await service.create_user(mock)).toEqual({
        id: expect.any(Number),
        email: mock.email,
        password: user_pass,
      });
    });
    it("should throw email already existed", async () => {
      const mock = {
        email: user_mail,
        password: user_pass,
      } as CreateUserDto;
      expect(async () => await service.create_user(mock)).rejects.toThrowError(
        get_app_exeption(AppError.EMAIL_EXISTED),
      );
    });
  });
});
