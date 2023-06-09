import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { jwt_decode } from "src/utils/jwt";

export class AuthInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const token = req?.headers?.authorization?.split('Bearer ')[1];
        const user = await jwt_decode(token);
        req.user = user;
        return next.handle();
    }
}