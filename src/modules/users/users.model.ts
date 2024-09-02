import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string | null;
  position: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'lastName' | 'createdAt' | 'updatedAt'
>;

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
  })
  id: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataTypes.STRING,
  })
  lastName: string | null;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  position: string;

  @Column({
    type: DataTypes.STRING,
    unique: {
      name: 'email_unique',
      msg: 'Email must be unique',
    },
    allowNull: false,
  })
  email: string;

  @Column({
    unique: {
      name: 'phone_unique',
      msg: 'Phone must be unique',
    },
    type: DataTypes.STRING(50),
  })
  phone: string;
}
