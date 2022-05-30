import GroupsService from '../../src/services/GroupsService';

describe('Groups', () => {
  it('Should return users list', async () => {
    const response = await GroupsService.list();

    expect(response[0]).toHaveProperty('groupsId');
    expect(response[0]).toHaveProperty('groupsName');
    expect(response[0]).toHaveProperty('groupsDescription');
  });
});
