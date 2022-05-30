import { Knex } from 'knex';

import User from '../../entity/User';

export const table_name = 'user';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(table_name, table => {
      table.uuid('userId').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.uuid('accountId').defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('firstName', 150).notNullable();
      table.string('lastName', 150).notNullable();
      table.string('email', 150).notNullable().unique();
    })
    .then(async () => {
      console.log(`tabela ${table_name} criada com sucesso!`);

      return knex<User>(table_name)
        .insert([
          {
            userId: '20e72a0c-04a1-487a-bfed-aa0fb21b9333',
            accountId: '10e72a0b-04a1-487a-bfed-aa0fb21b9333',
            firstName: 'super',
            lastName: 'user',
            email: 'email@email.com',
          },
        ])
        .then(() => {
          console.log(`seed da tabela ${table_name} criada com sucesso!`);
        });
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table_name);
}
