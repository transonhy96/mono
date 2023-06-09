import { Test, TestingModule } from '@nestjs/testing';
import { SharesController } from './shares.controller';
import { UserShare } from '@prisma/client';
import { CreateShareDto } from './dto/user_shares.dto';
import { SharesService } from './shares.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { ListResponseDto } from 'src/shared/dtos/response.dto';
import { PaginationParamsDto } from 'src/shared/dtos/pagination.dto';

describe('SharesController', () => {
  let controller: SharesController;
  const mockShareService = {
    get_shares: jest.fn((dto: PaginationParamsDto) => {
      return {
        count: 0,
        items: []
      } as ListResponseDto
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, UserModule, JwtModule],
      controllers: [SharesController],
      providers: [SharesService]
    })
      .overrideProvider(SharesService)
      .useValue(mockShareService)
      .compile();

    controller = module.get<SharesController>(SharesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('shares', () => {
    it('should return empty list', async () => {
      let mock = { limit: 10, offset: 0 };
      expect(await controller.shares(mock)).toEqual({
        count: 0,
        items: []
      });
      expect(mockShareService.get_shares).toHaveBeenCalledWith(mock)
    })
  });

});
