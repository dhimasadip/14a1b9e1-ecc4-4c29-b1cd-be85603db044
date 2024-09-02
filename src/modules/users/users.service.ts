import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User, UserCreationAttributes } from './users.model';
import { Optional } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sequelize: Sequelize,
  ) {}

  create(body: UserCreationAttributes): Promise<User> {
    return this.usersRepository.create(body);
  }

  // getAllAndCount(options: FindAndCountOptions<UserAttributes>) {
  //   return this.usersRepository.getAllAndCount(options);
  // }

  update(
    body: Optional<
      UserCreationAttributes,
      'firstName' | 'position' | 'email' | 'phone'
    >[],
  ) {
    return this.sequelize.transaction(async (t) => {
      const users = await Promise.all(
        body.map((userInfo) => {
          const { id, ...userAttributes } = userInfo;

          return this.usersRepository.update(userAttributes, {
            where: { id },
            transaction: t,
          });
        }),
      );

      return users;
    });
  }

  destroy(userId: number) {
    return this.usersRepository.destroy({
      where: { id: userId },
    });
  }
}
