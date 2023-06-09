import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { HashingModule } from 'src/hashing/hashing.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [PrismaModule, UserModule, HashingModule, JwtModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
