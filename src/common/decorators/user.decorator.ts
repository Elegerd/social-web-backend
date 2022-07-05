import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Users } from 'src/users/users.entity';

export const User = createParamDecorator(
  (data, context: ExecutionContext): Users => {
    const req = context.switchToHttp().getRequest();

    return req.user;
  },
);
