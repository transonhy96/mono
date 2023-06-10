import { Test, TestingModule } from "@nestjs/testing";
import { SharesGateway } from "./shares.gateway";

describe("SharesGateway", () => {
  let gateway: SharesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharesGateway],
    }).compile();

    gateway = module.get<SharesGateway>(SharesGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
