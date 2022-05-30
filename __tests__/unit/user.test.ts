import UserService from '../../src/services/UserService';
import request from 'supertest';
import app from '../../src/app';
import User from '@entity/User';

import * as faker from 'faker';

describe('User', () => {
  it('Should return users list', async () => {
    const response = await UserService.list();

    expect(response[0]).toHaveProperty('userId');
    expect(response[0]).toHaveProperty('accountId');
    expect(response[0]).toHaveProperty('firstName');
    expect(response[0]).toHaveProperty('lastName');
    expect(response[0]).toHaveProperty('email');
  });
  it('Should return user', async () => {
    const id = '6206cd9a-1342-4336-bba6-bc4d092abfcd';
    const response = await UserService.show(id);

    expect(response).toHaveProperty('userId');
    expect(response).toHaveProperty('accountId');
    expect(response).toHaveProperty('firstName');
    expect(response).toHaveProperty('lastName');
    expect(response).toHaveProperty('email');
  });
  it('Should create users list', async () => {
    const data = {
      firstName: 'Lucas Gois',
      lastName: 'dos Santos',
      email: faker.internet.email(),
      groupsId: 'e864f604-e043-11ec-9d64-0242ac120002',
    };
    const response = await UserService.create(data);

    expect((response as User[])[0]).toHaveProperty('userId');
    expect((response as User[])[0]).toHaveProperty('accountId');
    expect((response as User[])[0]).toHaveProperty('firstName');
    expect((response as User[])[0]).toHaveProperty('lastName');
    expect((response as User[])[0]).toHaveProperty('email');
  });

  it('Should create users list', async () => {
    const id = '6206cd9a-1342-4336-bba6-bc4d092abfcd';
    const data = {
      firstName: 'Cosmo User',
    };
    const response = await UserService.update(id, data);

    expect(response[0]).toHaveProperty('userId');
    expect(response[0]).toHaveProperty('accountId');
    expect(response[0]).toHaveProperty('firstName');
    expect(response[0]).toHaveProperty('lastName');
    expect(response[0]).toHaveProperty('email');
  });
});
