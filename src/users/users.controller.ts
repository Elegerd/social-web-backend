import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Users } from './users.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: Users,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
})
@Controller('users')
export class UsersController implements CrudController<Users> {
  constructor(public service: UsersService) {}
}