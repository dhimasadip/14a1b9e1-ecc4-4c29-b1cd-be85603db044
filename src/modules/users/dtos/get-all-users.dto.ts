import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class GetAllUsersQueryDto {
  @ApiProperty({ example: 1, required: true })
  @JoiSchema(Joi.number().min(1).required())
  page: number;

  @ApiProperty({ example: 10, required: true })
  @JoiSchema(Joi.number().min(1).required())
  limit: number;

  @ApiProperty({ example: 'ASC', required: true })
  @JoiSchema(Joi.string().valid('ASC', 'DESC').required())
  order: 'ASC' | 'DESC';

  @ApiProperty({ example: 'firstName', required: true })
  @JoiSchema(Joi.string().required())
  sortBy: string;
}
