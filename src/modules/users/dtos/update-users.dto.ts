import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UpdateUsersBodyDto {
  @ApiProperty({ example: 1, required: true })
  @JoiSchema(Joi.number().min(1).required())
  id: number;

  @ApiProperty({ example: 'John', required: false })
  @JoiSchema(Joi.string().optional())
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @JoiSchema(Joi.string().allow('', null).optional())
  lastName?: string;

  @ApiProperty({ example: 'CEO', required: false })
  @JoiSchema(Joi.string().optional())
  position?: string;

  @ApiProperty({ example: 'johndoe@mail.com', required: false })
  @JoiSchema(Joi.string().email().optional())
  email?: string;

  @ApiProperty({ example: '081234567890', required: false })
  @JoiSchema(
    Joi.string()
      .regex(RegExp('^[0-9]*$'))
      .message('phone must be a number')
      .regex(RegExp('^08'))
      .message('phone must start with 08')
      .min(8)
      .max(13)
      .optional(),
  )
  phone?: string;
}
