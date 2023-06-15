import { Test, TestingModule } from "@nestjs/testing";
import { SharesGateway } from "./shares.gateway";
import { JwtService } from "src/jwt/jwt.service";
import { UserService } from "src/user/user.service";
import { PrismaService } from "src/prisma/prisma.service";

describe("SharesGateway", () => {
  let gateway: SharesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharesGateway, UserService, JwtService, PrismaService],
    }).compile();

    gateway = module.get<SharesGateway>(SharesGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
