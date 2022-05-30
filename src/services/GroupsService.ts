import Groups from '@entity/Groups';
import GroupsRepositorie, {
  ListUserByGroupsIdResponse,
} from 'repositories/GroupsRepositorie';

class GroupsService {
  async list(): Promise<Groups[]> {
    const response = GroupsRepositorie.findAll();

    return response;
  }
  async listUserByGroupsId(
    groupsId: string,
  ): Promise<ListUserByGroupsIdResponse[]> {
    const users = await GroupsRepositorie.listUserByGroupsId(groupsId);

    return users;
  }
}

export default new GroupsService();
