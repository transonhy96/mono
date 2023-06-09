import { Test, TestingModule } from '@nestjs/testing';
import { SharesService } from './shares.service';
import { User, UserShare } from '@prisma/client';
import { ListResponseDto } from 'src/shared/dtos/response.dto';
import { PaginationParamsDto } from 'src/shared/dtos/pagination.dto';
import { CreateShareDto } from './dto/user_shares.dto';

describe('SharesService', () => {
  let service: SharesService;
  let user = {
    id: 0,
    email: 'test@test.com',
    password: 'test'
  } as User;
  let shares = [
    {
      id: 0,
      user_id: user.id,
      url: 'http://localhost:3000'
    },
    {
      id: 1,
      user_id: user.id,
      url: 'http://localhost:3000'
    }
  ] as UserShare[];

  const mockShareService = {
    get_shares: jest.fn(async (dto: PaginationParamsDto) => {
      console.log({ dto })
      let res = dto.offset && dto.limit && dto.limit > 0 ? shares.slice(dto.offset, dto.limit) : shares;
      return {
        count: res.length,
        items: res
      } as ListResponseDto
    }),
    create_share: jest.fn((dto: CreateShareDto) => {
      let new_share = {
        id: shares.length + 1,
        user_id: dto.user_id,
        url: dto.url,
      } as UserShare;
      shares.push(new_share);
      return new_share;
    })
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharesService],
    })
      .overrideProvider(SharesService)
      .useValue(mockShareService)
      .compile();

    service = module.get<SharesService>(SharesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("shares", () => {
    it("should return 1 item list of share", async () => {
      let mock = {
        offset: 0,
        limit: 1
      } as PaginationParamsDto;
      let first = shares[0];
      expect(await mockShareService.get_shares(mock)).toEqual({
        count: 1,
        items: [{
          id: first.id,
          user_id: first.user_id,
          url: first.url
        }]
      });
    });
    it("should return full list of share", async () => {
      let mock = {
      } as PaginationParamsDto;
      expect(await mockShareService.get_shares(mock)).toEqual({
        count: shares.length,
        items: shares
      });
    });
    it("should return an empty list of share", async () => {
      let mock = {
        offset: 20,
        limit: 20
      } as PaginationParamsDto;
      expect(await mockShareService.get_shares(mock)).toEqual({
        count: 0,
        items: []
      });
    });
  })
});
