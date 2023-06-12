import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";
import { HashingService } from "src/hashing/hashing.service";
import { JwtService } from "src/jwt/jwt.service";

describe("SharesController (e2e)", () => {
  let app: INestApplication;
  const route = "/shares/";
  let signUpRes: {
    id: number;
    email: string;
    token: string;
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        PrismaService,
        AuthService,
        UserService,
        HashingService,
        JwtService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    const prisma = moduleFixture.get<PrismaService>(PrismaService);
    const auth = moduleFixture.get<AuthService>(AuthService);
    await app.init();
    await prisma.user.deleteMany({});
    await prisma.userShare.deleteMany({});
    signUpRes = await auth.signup({
      email: "share@test.com",
      password: "test",
    });
  });

  it(route + "list " + "should create new user", () => {
    return request(app.getHttpServer())
      .get(route + "list")
      .expect(200);
  });

  describe(route + "create", () => {
    it(route + "create " + " should throw 403 error", () => {
      return request(app.getHttpServer())
        .post(route + "create")
        .send({
          user_id: 0,
          url: "http://localhost:3000",
        })
        .expect(403);
    });
    it(route + "create " + " should create new share", () => {
      return request(app.getHttpServer())
        .post(route + "create")
        .set("Authorization", "Bearer " + signUpRes.token)
        .send({
          user_id: signUpRes.id,
          url: "http://localhost:3000",
        })
        .expect(201);
    });
  });
});
