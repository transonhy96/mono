import { Test, TestingModule } from "@nestjs/testing";
import { SharesController } from "./shares.controller";
import { SharesService } from "./shares.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "src/jwt/jwt.module";
import { ListResponseDto } from "src/shared/dtos/response.dto";
import { SharesGateway } from "./shares.gateway";
import { User, UserShare } from "@prisma/client";
import { CreateShareDto } from "./dto/user_shares.dto";
import { UserService } from "src/user/user.service";
import { get_app_exeption } from "src/utils/error";
import { AppError } from "src/configs/constants";

describe("SharesController", () => {
  let controller: SharesController;
  const user = {
    id: 0,
    email: "test@test.com",
    password: "test",
  } as User;
  const users = [user];
  const shares = [
    {
      id: 0,
      user_id: user.id,
      url: "http://localhost:3000",
    },
    {
      id: 1,
      user_id: user.id,
      url: "http://localhost:3000",
    },
  ] as UserShare[];

  const mockShareService = {
    get_shares: jest.fn(async () => {
      return {
        count: 0,
        items: [],
      } as ListResponseDto;
    }),
    create_share: jest.fn(async (dto: CreateShareDto) => {
      return {
        id: shares.length + 1,
        user_id: dto.user_id,
        url: dto.url,
      };
    }),
  };
  const mockUserService = {
    get_user_by_email: jest.fn(async (email: string) => {
      return users.find((s) => s.email === email);
    }),
  };
  const mockGateWay = {
    gossip: jest.fn(async (user: User, share: UserShare) => {
      return;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, UserModule, JwtModule],
      controllers: [SharesController],
      providers: [SharesService, SharesGateway, UserService],
    })
      .overrideProvider(SharesService)
      .useValue(mockShareService)
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(SharesGateway)
      .useValue(mockGateWay)
      .compile();

    controller = module.get<SharesController>(SharesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("shares", () => {
    it("should return empty list", async () => {
      const mock = { limit: 10, offset: 0 };
      expect(await controller.shares(mock)).toEqual({
        count: 0,
        items: [],
      });
      expect(mockShareService.get_shares).toHaveBeenCalledWith(mock);
    });
  });
  describe("createShare", () => {
    it("should throw an user not existed", async () => {
      expect(async () => {
        await controller.createShare(
          {
            user_id: -1,
            url: "http://localhost:3000",
          },
          {
            email: "random@ramdom.com",
            id: -1,
          } as UserPayload,
        );
      }).rejects.toThrowError(get_app_exeption(AppError.USER_NOT_EXISTED));
    });

    it("should create share and notification", async () => {
      const share = await controller.createShare(
        {
          user_id: user.id,
          url: "http://localhost:3000",
        },
        user as UserPayload,
      );
      expect(share).toEqual({
        id: expect.any(Number),
        user_id: 0,
        url: "http://localhost:3000",
      });
      expect(mockGateWay.gossip).toHaveBeenCalledWith(user, share);
    });
  });
});
