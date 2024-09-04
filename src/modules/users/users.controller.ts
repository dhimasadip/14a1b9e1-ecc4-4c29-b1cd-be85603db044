import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserBodyDto } from './dtos/create-user.dto';
import { DestoyUserParamDto } from './dtos/destroy-user.dto';
import { UpdateUsersBodyDto } from './dtos/update-users.dto';
import { GetAllUsersQueryDto } from './dtos/get-all-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserBodyDto) {
    const user = await this.usersService.create(body);

    return { user };
  }

  @Get()
  getAll(@Query() query: GetAllUsersQueryDto) {
    return this.usersService.getAllAndCount(query);
  }

  @Put()
  async update(@Body() body: UpdateUsersBodyDto) {
    await this.usersService.update(body.users);

    return { message: 'Success' };
  }

  @Delete('/:userId')
  async destoy(@Param() param: DestoyUserParamDto) {
    await this.usersService.destroy(param.userId);

    return { message: 'Success' };
  }
}
