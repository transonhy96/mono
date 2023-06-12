import { Injectable } from "@nestjs/common";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { APP_CONFIG } from "src/configs";
@Injectable()
export class JwtService {
  async sign(payload: UserPayload) {
    return jwt.sign(payload, process.env.SECRET, {
      expiresIn: APP_CONFIG.JWT_EXPIRED,
    });
  }

  async decode(token: string) {
    return jwt.decode(token);
  }
  async decode_header(req: Request) {
    return this.decode(this.extract_token(req));
  }
  async verify(token: string) {
    return jwt.verify(token, process.env.SECRET);
  }
  extract_token(req: Request): string {
    const auths = req?.headers?.authorization?.split("Bearer ");
    return auths && auths.length === 2 ? auths[1] : "";
  }
  async verify_header(req: Request) {
    return this.verify(this.extract_token(req));
  }
}
