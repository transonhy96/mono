import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async get_user_by_email(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async create_user(user: CreateUserDto) {
        return this.prisma.user.create({
            data: user
        });
    }

}
