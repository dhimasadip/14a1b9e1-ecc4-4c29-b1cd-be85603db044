import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class CreateUserBodyDto {
  @ApiProperty({ example: 'John', required: true })
  @JoiSchema(Joi.string().required())
  firstName: string;

  @ApiProperty({ example: 'Doe', required: false })
  @JoiSchema(Joi.string().allow('', null).optional())
  lastName?: string;

  @ApiProperty({ example: 'CEO', required: true })
  @JoiSchema(Joi.string().required())
  position: string;

  @ApiProperty({ example: 'johndoe@mail.com', required: true })
  @JoiSchema(Joi.string().email().required())
  email: string;

  @ApiProperty({ example: '081234567890', required: true })
  @JoiSchema(
    Joi.string()
      .regex(RegExp('^[0-9]*$'))
      .message('phone must be a number')
      .regex(RegExp('^08'))
      .message('phone must start with 08')
      .min(8)
      .max(13)
      .required(),
  )
  phone: string;
}
