import { Module } from "@nestjs/common";
import { SharesController } from "./shares.controller";
import { SharesService } from "./shares.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "src/jwt/jwt.module";
import { SharesGateway } from "./shares.gateway";

@Module({
  imports: [PrismaModule, UserModule, JwtModule],
  controllers: [SharesController],
  providers: [SharesService, SharesGateway],
  exports: [SharesService],
})
export class SharesModule {}
