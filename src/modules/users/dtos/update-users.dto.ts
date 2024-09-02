import Joi from 'joi';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';

class UpdateUserSchema {
  @JoiSchema(Joi.number().min(1).required())
  id: number;

  @JoiSchema(Joi.string().optional())
  firstName?: string;

  @JoiSchema(Joi.string().allow('', null).optional())
  lastName?: string | null;

  @JoiSchema(Joi.string().optional())
  position?: string;

  @JoiSchema(Joi.string().email().optional())
  email?: string;

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

export class UpdateUsersBodyDto {
  @JoiSchema(Joi.array().items(getTypeSchema(UpdateUserSchema)))
  users: UpdateUserSchema[];
}
