import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class DestoyUserParamDto {
  @ApiProperty({ example: 1, required: true })
  @JoiSchema(Joi.number().required())
  userId: number;
}
