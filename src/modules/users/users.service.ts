import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User, UserCreationAttributes } from './users.model';
import { Optional } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { GetAllUsersQueryDto } from './dtos/get-all-users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sequelize: Sequelize,
  ) {}

  create(body: UserCreationAttributes): Promise<User> {
    return this.usersRepository.create(body);
  }

  async getAllAndCount(query: GetAllUsersQueryDto) {
    const { limit, page, sortBy, order } = query;

    const userAttributes = Object.keys(User.getAttributes());
    if (!userAttributes.some((val) => val === sortBy)) {
      throw new BadRequestException({
        code: 'InvalidInput',
        message: `User doesn't have attribute: ${sortBy}`,
      });
    }

    const data = await this.usersRepository.getAllAndCount({
      limit,
      offset: limit * page - limit,
      order: [[sortBy, order]],
    });

    return {
      users: data.rows,
      totalData: data.count,
      totalPages: Math.ceil(data.count / limit),
    };
  }

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
