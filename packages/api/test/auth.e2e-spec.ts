import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { PrismaService } from "src/prisma/prisma.service";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const route = "/auth/";
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await prisma.userShare.deleteMany({});
    await prisma.user.deleteMany({
      where: {
        email: {
          equals: "another@test.com",
        },
      },
    });
  });

  it(route + "signup " + "should create new user", async () => {
    await prisma.user.deleteMany({});
    return request(app.getHttpServer())
      .post(route + "signup")
      .send({
        email: "another@test.com",
        password: "test",
      })
      .expect(201);
  });
  it(route + "signup " + "should throw 403 error", () => {
    return request(app.getHttpServer())
      .post(route + "signup")
      .send({
        email: "another@test.com",
        password: "test",
      })
      .expect(403);
  });
  it("/auth/login should return token", () => {
    return request(app.getHttpServer())
      .post(route + "login")
      .send({
        email: "another@test.com",
        password: "test",
      })
      .expect(201);
  });

  it("/auth/login should return 403 error", () => {
    return request(app.getHttpServer())
      .post(route + "login")
      .send({
        email: "error@test.com",
        password: "test",
      })
      .expect(403);
  });

  it("/auth/login should return 400 error", () => {
    return request(app.getHttpServer())
      .post(route + "login")
      .send({
        email: "another@test.com",
        password: "wrongpass",
      })
      .expect(400);
  });
});
