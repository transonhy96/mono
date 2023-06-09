import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [PrismaModule]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
