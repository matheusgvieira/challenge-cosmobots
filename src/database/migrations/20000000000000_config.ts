import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .raw(
      `
      CREATE SCHEMA IF NOT EXISTS public;
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      ALTER EXTENSION "uuid-ossp" SET SCHEMA public;
      CREATE EXTENSION IF NOT EXISTS "unaccent";
      ALTER EXTENSION "unaccent" SET SCHEMA public;
    `,
    )
    .then(() => {
      console.log(`configurações feita com sucesso!`);
    });
}

export async function down(_knex: Knex): Promise<void> {}
