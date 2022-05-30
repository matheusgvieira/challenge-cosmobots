import request from 'supertest';
import app from '../../src/app';

describe('User test', () => {
  it('Should return users list', async () => {
    const res = await request(app).get('/user');

    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('accountId');
    expect(res.body[0]).toHaveProperty('firstName');
    expect(res.body[0]).toHaveProperty('lastName');
    expect(res.body[0]).toHaveProperty('email');
  });
});
