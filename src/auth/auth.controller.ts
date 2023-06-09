import { Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwt_sign } from 'src/utils/jwt';

@Controller('auth')
export class AuthController {

    constructor(private prisma: PrismaService) { }
    @Post("/signup")
    async signup() {
        let token = await jwt_sign({ id: 1, name: 'test' });
        await this.prisma.user.findMany();
        return token;
    }
}
