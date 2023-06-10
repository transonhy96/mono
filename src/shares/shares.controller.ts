import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiHeader } from "@nestjs/swagger";
import { UserShare } from "@prisma/client";
import { AuthUser } from "src/auth/auth.decorator";
import { get_app_exeption } from "src/utils/error";
import { CreateShareDto } from "./dto/user_shares.dto";
import { AppError } from "src/configs/constants";
import { AuthGuard } from "src/auth/auth.guard";
import { UserService } from "src/user/user.service";
import { SharesService } from "./shares.service";
import { PaginationParamsDto } from "src/shared/dtos/pagination.dto";
import { SharesGateway } from "./shares.gateway";
@Controller("shares")
export class SharesController {
  constructor(
    private shareService: SharesService,
    private userService: UserService,
    private shareGateway: SharesGateway,
  ) { }

  @Get("/list")
  async shares(@Query() { offset, limit }: PaginationParamsDto) {
    return this.shareService.get_shares({
      offset,
      limit,
    });
  }

  @UseGuards(AuthGuard)
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
  })
  @Post("/create")
  async createShare(
    @Body() postData: CreateShareDto,
    @AuthUser() auth_user: UserPayload,
  ) {
    const { url } = postData;
    const user = await this.userService.get_user_by_email(auth_user.email);
    if (!user) throw get_app_exeption(AppError.USER_NOT_EXISTED);
    const share = await this.shareService.create_share({
      url,
      user_id: user.id,
    });
    if (share) {
      this.shareGateway.gossip(user, share);
    }
    return share;
  }
}
