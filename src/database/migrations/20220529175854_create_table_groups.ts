import { Knex } from 'knex';

import Groups from '../../entity/Groups';
import { v4 as uuidv4 } from 'uuid';

export const table_name = 'groups';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(table_name, table => {
      table
        .uuid('groupsId')
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .primary();
      table.string('groupsName', 150).notNullable();
      table.string('groupsDescription', 150);
    })
    .then(() => {
      console.log(`tabela ${table_name} criada com sucesso!`);

      return knex<Groups>(table_name).insert([
        {
          groupsId: 'e864f604-e043-11ec-9d64-0242ac120002',
          groupsName: 'Support Agents',
          groupsDescription: 'Agentes de suporte da cosmobots',
        },
        {
          groupsId: uuidv4(),
          groupsName: 'Bot Builders',
          groupsDescription: 'Bot cosntrutores da cosmobots',
        },
        {
          groupsId: uuidv4(),
          groupsName: 'Bot Admins',
          groupsDescription: 'Bot administradores da cosmobots',
        },
      ]);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table_name);
}
