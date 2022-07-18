import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Users } from './users.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: Users,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
})
@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController implements CrudController<Users> {
  constructor(public service: UsersService) {}
}
