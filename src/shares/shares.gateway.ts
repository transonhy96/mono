import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { JwtService } from "src/jwt/jwt.service";
import { UserService } from "src/user/user.service";
import { Socket, Server } from "socket.io";
import { UnauthorizedException } from "@nestjs/common";
import { User, UserShare } from "@prisma/client";
@WebSocketGateway({
  namespace: "shares",
})
export class SharesGateway {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  @WebSocketServer()
  server: Server;

  async gossip(user: User, share: UserShare) {
    this.server.emit("new_share", {
      email: user.email,
      url: share.url,
      user_id: user.id,
    });
  }

  async handleConnection(socket: Socket) {
    try {
      const auths = socket.handshake.headers?.authorization?.split(" ");
      const token = auths && auths.length === 2 ? auths[1] : "";
      const decoded = (await this.jwtService.verify(token)) as UserPayload;
      if (decoded.email) {
        const existed = await this.userService.get_user_by_email(decoded.email);
        if (!existed) {
          this.disconnect(socket);
        }
      }
    } catch (error) {
      this.disconnect(socket);
    }
  }
  disconnect(socket: Socket) {
    socket.emit("Forbidden", new UnauthorizedException());
    socket.disconnect();
  }
}
