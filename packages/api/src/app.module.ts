import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { HashingModule } from "./hashing/hashing.module";
import { JwtService } from "./jwt/jwt.service";
import { JwtModule } from "./jwt/jwt.module";
import { SharesModule } from "./shares/shares.module";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    HashingModule,
    JwtModule,
    SharesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
    JwtService,
  ],
})
export class AppModule {}
