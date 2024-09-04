import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class GetAllUsersQueryDto {
  @JoiSchema(Joi.number().min(1).required())
  page: number;

  @JoiSchema(Joi.number().min(1).required())
  limit: number;

  @JoiSchema(Joi.string().valid('ASC', 'DESC').required())
  order: 'ASC' | 'DESC';

  @JoiSchema(Joi.string().required())
  sortBy: string;
}
