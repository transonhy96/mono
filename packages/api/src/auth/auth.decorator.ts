import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const AuthUser = createParamDecorator(
  (data, context: ExecutionContext): UserPayload => {
    const user = context.switchToHttp().getRequest()?.user as UserPayload;
    return user;
  },
);
