import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtPayload } from "jsonwebtoken";
import { JwtService } from "src/jwt/jwt.service";
import { UserService } from "src/user/user.service";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = req?.headers?.authorization?.split('Bearer ')[1];
        try {
            const user = await this.jwtService.verify(token) as JwtPayload;
            //TODO: implement redis cached
            const existed = this.userService.get_user_by_email(user.email);
            return existed ? true : false;
        } catch (error) {
            return false;
        }
    }
}