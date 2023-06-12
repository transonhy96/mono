import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "./jwt.service";
import { Request } from "express";

describe("JwtService", () => {
  let service: JwtService;
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
      const mockReq = {
        headers: {
          authorization: "Bearer token",
        },
      } as Request;
      expect(service.extract_token(mockReq)).toBe("token");
    });
    it("should return empty string", () => {
      const req = {
        headers: {
          authorization: "Bearer ",
        },
      } as Request;
      expect(service.extract_token(req)).toBe("");
    });
    it("should return empty string", () => {
      const mockReq = {
        headers: {
          authorization: "",
        },
      } as Request;
      expect(service.extract_token(mockReq)).toBe("");
    });
    it("should return empty string", () => {
      const mockReq = {
        headers: {},
      } as Request;
      expect(service.extract_token(mockReq)).toBe("");
    });
  });
});
