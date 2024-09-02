import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class CreateUserBodyDto {
  @JoiSchema(Joi.string().required())
  firstName: string;

  @JoiSchema(Joi.string().allow('', null).optional())
  lastName?: string | null;

  @JoiSchema(Joi.string().required())
  position: string;

  @JoiSchema(Joi.string().email().required())
  email: string;

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
