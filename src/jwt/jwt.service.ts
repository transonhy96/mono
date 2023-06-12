import { Injectable } from "@nestjs/common";
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

  async verify(token: string) {
    return jwt.verify(token, process.env.SECRET);
  }
  extract_header(header: string): string {
    const auths = header.split("Bearer ");
    return auths.length === 2 ? auths[1] : "";
  }
  async verify_header(header: string) {
    return this.verify(this.extract_header(header));
  }
}
