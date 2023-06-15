import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "src/jwt/jwt.service";
@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    try {
      const req = context.switchToHttp().getRequest();
      const user = (await this.jwtService.decode_header(req)) as UserPayload;
      req.user = user;
    } catch (error) {
      console.log({ error });
    }
    return next.handle();
  }
}
