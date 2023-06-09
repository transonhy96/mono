import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "src/jwt/jwt.service";
@Injectable()
export class AuthInterceptor implements NestInterceptor {
    constructor(
        private jwtService: JwtService
    ) { }
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const token = req?.headers?.authorization?.split('Bearer ')[1];
        const user = await this.jwtService.decode(token);
        req.user = user;
        return next.handle();
    }
}