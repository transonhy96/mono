import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest()?.user;
});