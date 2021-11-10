import { ConnectionOptions } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();
const nodeEnvironment = `${(process.env.NODE_ENV || 'development').toLowerCase()}`;

const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.model{.ts,.js}'],
  synchronize: true,
  logging: nodeEnvironment === 'development' ? true : false,
  dropSchema: nodeEnvironment === 'test' ? true : false,
};

// important to work with CLI.
module.exports = {
  ...typeormConfig,
  seeds: ['database/**/*.seed{.ts,.js}'],
  factories: ['database/**/*.factory{.ts,.js}'],
};