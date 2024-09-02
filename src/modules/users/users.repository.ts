import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserAttributes, UserCreationAttributes } from './users.model';
import {
  CreateOptions,
  DestroyOptions,
  FindAndCountOptions,
  Optional,
  UpdateOptions,
} from 'sequelize';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  create(
    body: UserCreationAttributes,
    options?: CreateOptions<UserAttributes>,
  ): Promise<User> {
    return this.userModel.create(body, options);
  }

  getAllAndCount(options: FindAndCountOptions<UserAttributes>) {
    return this.userModel.findAndCountAll(options);
  }

  update(
    body: Optional<
      UserCreationAttributes,
      'firstName' | 'position' | 'email' | 'phone'
    >,
    options: UpdateOptions<UserAttributes>,
  ) {
    return this.userModel.update(body, {
      ...options,
      individualHooks: true,
    });
  }

  destroy(options: DestroyOptions<UserAttributes>) {
    return this.userModel.destroy({
      ...options,
      individualHooks: true,
    });
  }
}
