import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtPayload, jwt_verify } from "src/utils/jwt";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = req?.headers?.authorization?.split('Bearer ')[1];
        try {
            const user = await jwt_verify(token) as JwtPayload;
            //TODO: implement redis cached
            const existed = this.userService.get_user_by_email(user.email);
            return existed ? true : false;
        } catch (error) {
            return false;
        }
    }
}