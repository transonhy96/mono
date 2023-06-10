import { Test, TestingModule } from "@nestjs/testing";
import { SharesService } from "./shares.service";
import { User, UserShare } from "@prisma/client";
import { PaginationParamsDto } from "src/shared/dtos/pagination.dto";
import { CreateShareDto } from "./dto/user_shares.dto";
import { PrismaService } from "src/prisma/prisma.service";

describe("SharesService", () => {
  let service: SharesService;
  const user = {
    id: 0,
    email: "test@test.com",
    password: "test",
  } as User;
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
  interface PrismaData {
    data: CreateShareDto;
  }
  interface PrismaFindMany {
    skip?: number;
    take?: number;
  }
  const mockPrismaService = {
    userShare: {
      findMany: jest.fn(async (prismaFindMany: PrismaFindMany) => {
        const user_shares = shares.sort((s) => s.id).slice();
        const res =
          prismaFindMany?.skip >= 0 && prismaFindMany?.take >= 0
            ? user_shares.slice(prismaFindMany.skip, prismaFindMany.take)
            : user_shares;
        return res;
      }),
      count: jest.fn(async () => {
        return shares.length;
      }),
      create: jest.fn(async (body: PrismaData) => {
        const new_share = {
          id: shares.length + 1,
          user_id: body.data.user_id,
          url: body.data.url,
        } as UserShare;
        shares.push(new_share);
        return new_share;
      }),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<SharesService>(SharesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("shares", () => {
    it("should return 1 item list of share", async () => {
      const mock = {
        offset: 0,
        limit: 1,
      } as PaginationParamsDto;
      expect(await service.get_shares(mock)).toEqual({
        count: shares.length,
        items: [shares[0]],
      });
      expect(mockPrismaService.userShare.findMany).toHaveBeenCalled();
      expect(mockPrismaService.userShare.count).toHaveBeenCalled();
    });
    it("should return full list of share", async () => {
      const mock = {} as PaginationParamsDto;
      expect(await service.get_shares(mock)).toEqual({
        count: shares.length,
        items: shares,
      });
      expect(mockPrismaService.userShare.findMany).toHaveBeenCalled();
    });
    it("should return an empty list of share", async () => {
      const mock = {
        offset: 20,
        limit: 20,
      } as PaginationParamsDto;
      expect(await service.get_shares(mock)).toEqual({
        count: shares.length,
        items: [],
      });
      expect(mockPrismaService.userShare.findMany).toHaveBeenCalled();
    });
  });

  describe("create_share", () => {
    it("should create new youtube share", async () => {
      const new_url = "http://test.com";
      const mock = {
        user_id: 0,
        url: new_url,
      } as CreateShareDto;
      expect(await service.create_share(mock)).toEqual({
        id: expect.any(Number),
        url: new_url,
        user_id: expect.any(Number),
      });
      expect(mockPrismaService.userShare.create).toHaveBeenCalled();
    });
  });
});
