import path from 'path';
import dotenv from 'dotenv';
import { databaseConfig } from './database.config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

// Environment Setup
const dotenv_path = path.resolve(process.cwd(), '.env');
dotenv.config({ path: dotenv_path });

const dbConfig = databaseConfig();

const sequelizeConfig: SequelizeModuleOptions = {
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  port: dbConfig.port,
  timezone: dbConfig.timezone,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
};

export default sequelizeConfig;
