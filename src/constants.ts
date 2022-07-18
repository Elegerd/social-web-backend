import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const {
  NODE_ENV,
  GLOBAL_PREFIX,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  FRONTEND_BASE_URL,
} = process.env;

export const API_PORT = Number(process.env.API_PORT);

export const IS_DEVELOPMENT = NODE_ENV === 'development';

export const TYPEORM_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: IS_DEVELOPMENT,
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
  autoLoadEntities: true,
};

export const SECOND_IN_MS = 1000;
export const MINUTES_IN_MS = SECOND_IN_MS * 60;
export const HOUR_IN_MS = MINUTES_IN_MS * 60;
export const DAY_IN_MS = HOUR_IN_MS * 24;
export const WEEK_IN_MS = DAY_IN_MS * 7;

export const ERROR_MESSAGE = 'Что-то пошло не так, попробуйте еще раз';
