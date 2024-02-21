import { Model, DataTypes } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

@Injectable()
export class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export const userProvider = {
  provide: 'UserModel',
  useValue: User,
};

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
  models: [],
};
