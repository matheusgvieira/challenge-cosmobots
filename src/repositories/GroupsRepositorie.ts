import Model from '../models/Model';

import Groups from '../entity/Groups';
import UserRepositorie from './UserRepositorie';
import User from '@entity/User';

class GroupsRepositorie extends Model<Groups> {
  constructor() {
    super('groups');
  }

  listUserByGroupsId(groupsId: string): Promise<ListUserByGroupsIdResponse[]> {
    return this.findAll('gp')
      .select('gp.groupsId', 'us.*')
      .join(UserRepositorie.getTableName('us'), 'us.groupsId', 'gp.groupsId')
      .where('gp.groupsId', groupsId)
      .whereNull('us.removedIn');
  }
}

export default new GroupsRepositorie();

export interface ListUserByGroupsIdResponse extends User {
  groupsId: string;
}
