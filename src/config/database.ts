import 'dotenv/config';

export const database_config = {
  client: process.env.DB_DIALECT || 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123',
    database: process.env.DB_NAME || 'postgres',
    schema: process.env.DB_SCHEMA || 'public',
  },
};

if (process.env.NODE_ENV?.trim() === 'test') {
  database_config.connection.host = 'localhost';
  database_config.connection.port = '5432';
  database_config.connection.user = 'postgres';
  database_config.connection.password = '123';
  database_config.connection.database = 'postgres';
}

export default database_config;
