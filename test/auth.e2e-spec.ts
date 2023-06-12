import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  const route = "/auth/";
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(route + "signup " + "should create new user", () => {
    return request(app.getHttpServer())
      .post(route + "signup")
      .send({
        email: "test@test.com",
        password: "test",
      })
      .expect(201);
  });
  it(route + "signup " + "should throw 403 error", () => {
    return request(app.getHttpServer())
      .post(route + "signup")
      .send({
        email: "test@test.com",
        password: "test",
      })
      .expect(403);
  });
  it("/auth/login should return token", () => {
    return request(app.getHttpServer())
      .post(route + "login")
      .send({
        email: "test@test.com",
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
        email: "test@test.com",
        password: "wrongpass",
      })
      .expect(400);
  });
});
