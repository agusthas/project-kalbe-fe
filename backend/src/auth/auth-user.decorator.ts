import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

type RequestUser = Omit<User, 'password'> | null;

export interface RequestWithUser extends Request {
  user: RequestUser;
}

export const AuthUser = createParamDecorator(
  (data: keyof RequestUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return data ? user && user[data] : user;
  },
);
