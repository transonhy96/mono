import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, context: ExecutionContext): JWTPayload => {
    const user = context.switchToHttp().getRequest()?.user as JWTPayload;
    return user;
});