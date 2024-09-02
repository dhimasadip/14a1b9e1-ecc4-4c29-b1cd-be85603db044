import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserBodyDto } from './dtos/create-user.dto';
import { DestoyUserParamDto } from './dtos/destroy-user.dto';
import { UpdateUsersBodyDto } from './dtos/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserBodyDto) {
    const user = await this.usersService.create(body);

    return { user };
  }

  @Put()
  async update(@Body() body: UpdateUsersBodyDto) {
    await this.usersService.update(body.users);

    return { message: 'Success' };
  }

  @Delete()
  async destoy(@Param() param: DestoyUserParamDto) {
    await this.usersService.destroy(param.userId);

    return { message: 'Success' };
  }
}
