import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "./jwt.service";

describe("JwtService", () => {
  let service: JwtService;
  const payload = {
    email: "test@test.com",
    id: 0,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  describe("extract_header", () => {
    it("should return token", async () => {
      const mockHeader = "Bearer token";
      expect(service.extract_header(mockHeader)).toBe("token");
    });
    it("should return empty string", () => {
      const mockHeader = "Bearer";
      expect(service.extract_header(mockHeader)).toBe("");
    });
    it("should return empty string", () => {
      const mockHeader = "";
      expect(service.extract_header(mockHeader)).toBe("");
    });
    it("should return empty string", () => {
      const mockHeader = "token Bearer";
      expect(service.extract_header(mockHeader)).toBe("");
    });
  });
});
