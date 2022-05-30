import { Knex } from 'knex';

import random from 'random-name';

import { v4 as uuidv4 } from 'uuid';

import User from '../../entity/User';

const table_name = 'user';

export async function seed(knex: Knex): Promise<void> {
  await knex<User>(table_name)
    .insert([
      {
        userId: '6206cd9a-1342-4336-bba6-bc4d092abfcd',
        accountId: '7206cd9a-1342-4336-bba6-bc4d092abfce',
        firstName: 'Matheus',
        lastName: 'Cosmobot',
        email: 'gcemail@email.com',
        groupsId: 'e864f604-e043-11ec-9d64-0242ac120002',
      },
      {
        userId: uuidv4(),
        accountId: uuidv4(),
        firstName: random.first(),
        lastName: random.last(),
        email: 'adall@gotcertify.com',
        groupsId: 'e864f604-e043-11ec-9d64-0242ac120002',
      },
    ])
    .then(() => {
      console.log(`seed da tabela ${table_name} criada com sucesso!`);
    });
}
