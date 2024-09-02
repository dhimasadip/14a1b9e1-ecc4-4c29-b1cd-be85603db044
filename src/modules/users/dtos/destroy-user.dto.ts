import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class DestoyUserParamDto {
  @JoiSchema(Joi.number().required())
  userId: number;
}
