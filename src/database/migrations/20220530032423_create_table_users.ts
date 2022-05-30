import { Knex } from 'knex';

import { v4 as uuidv4 } from 'uuid';

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
      table.uuid('groupsId').references('groupsId').inTable('groups').index();

      table.dateTime('createdIn').notNullable().defaultTo(knex.fn.now());
      table.dateTime('removedIn');
    })
    .then(async () => {
      console.log(`tabela ${table_name} criada com sucesso!`);

      return knex<User>(table_name)
        .insert([
          {
            userId: uuidv4(),
            accountId: uuidv4(),
            firstName: 'super',
            lastName: 'user',
            email: 'email@email.com',
            groupsId: 'e864f604-e043-11ec-9d64-0242ac120002',
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
