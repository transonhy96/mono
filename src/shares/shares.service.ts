import { Injectable } from '@nestjs/common';
import { Prisma, UserShare } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShareDto, FilterShareDto } from './dto/user_shares.dto';
import { PaginationParamsDto } from 'src/shared/dtos/pagination.dto';


@Injectable()
export class SharesService {

    constructor(
        private prisma: PrismaService
    ) { }
    async get_shares({ limit, offset, startingId }: PaginationParamsDto) {
        let count = await this.prisma.userShare.count();
        let shares = await this.prisma.userShare.findMany({
            take: limit,
            skip: offset,
            cursor: {
                id: startingId ?? 1,
            },
        });
        return {
            count,
            items: shares
        };
    }
    async create_share(data: CreateShareDto): Promise<UserShare> {
        return this.prisma.userShare.create({
            data
        });
    }
}
