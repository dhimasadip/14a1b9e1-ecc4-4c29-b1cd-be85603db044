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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getTypeSchema, JoiPipe } from 'nestjs-joi';
import Joi from 'joi';
import { joiPipeConfig } from '../../configs/joi-pipe.config';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Users')
  @ApiResponse({
    type: CreateUserBodyDto,
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @Post()
  async create(@Body() body: CreateUserBodyDto) {
    const user = await this.usersService.create(body);

    return { user };
  }

  @ApiTags('Users')
  @ApiResponse({
    status: 200,
    description: 'A list of a users must be shown',
  })
  @Get()
  getAll(@Query() query: GetAllUsersQueryDto) {
    return this.usersService.getAllAndCount(query);
  }

  @ApiTags('Users')
  @ApiResponse({
    status: 200,
    description: 'Users has been successfully updated.',
  })
  @ApiBody({
    type: UpdateUsersBodyDto,
  })
  @Put()
  async update(
    @Body(
      new JoiPipe(
        Joi.array().items(getTypeSchema(UpdateUsersBodyDto)),
        joiPipeConfig.pipeOpts,
      ),
    )
    body: UpdateUsersBodyDto[],
  ) {
    await this.usersService.update(body);

    return { message: 'Success' };
  }

  @ApiTags('Users')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @Delete('/:userId')
  async destoy(@Param() param: DestoyUserParamDto) {
    await this.usersService.destroy(param.userId);

    return { message: 'Success' };
  }
}
