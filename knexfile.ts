import 'dotenv/config';
import { resolve } from 'path';

import { database_config } from './src/config/database';

module.exports = {
  development: {
    ...database_config,
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve('src', 'database', 'migrations'),
    },
    seeds: {
      tableName: 'knex_seeds',
      directory: resolve('src', 'database', 'seeds'),
    },
  },
  test: {
    ...database_config,
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve('src', 'database', 'migrations'),
    },
    seeds: {
      tableName: 'knex_seeds',
      directory: resolve('src', 'database', 'seeds'),
    },
  },
  production: {
    ...database_config,
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve('src', 'database', 'migrations'),
    },
    seeds: {
      tableName: 'knex_seeds',
      directory: resolve('src', 'database', 'seeds'),
    },
  },
};
