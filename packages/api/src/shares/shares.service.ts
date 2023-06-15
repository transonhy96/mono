import { Injectable } from "@nestjs/common";
import { UserShare } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateShareDto } from "./dto/user_shares.dto";
import { PaginationParamsDto } from "src/shared/dtos/pagination.dto";

@Injectable()
export class SharesService {
  constructor(private prisma: PrismaService) { }
  async get_shares({ limit, offset }: PaginationParamsDto) {
    const count = await this.prisma.userShare.count();
    const shares = await this.prisma.userShare.findMany({
      take: limit,
      skip: offset,
      include: {
        user: {
          select: {
            email: true,
            id: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    return {
      count,
      items: shares,
    };
  }
  async create_share(data: CreateShareDto): Promise<UserShare> {
    return this.prisma.userShare.create({
      data,
    });
  }
}
