import User from 'entity/User';
import GroupsRepositorie from 'repositories/GroupsRepositorie';
import UserRepositorie from '../repositories/UserRepositorie';

class UserService {
  async list(): Promise<User[]> {
    const users = await UserRepositorie.list();

    return users;
  }

  async show(userId: string): Promise<User | MessageResponse> {
    const userById = await UserRepositorie.findById(userId);

    if (!userById) {
      return {
        message: 'Usuario não encontrado!',
      };
    }

    return userById;
  }

  async create(data: UserCreteRequest): Promise<User[] | MessageResponse> {
    const emailExisted = await UserRepositorie.findByEmail(data.email);

    if (emailExisted) {
      return {
        message: 'Email already registred!',
      };
    }

    const group = await GroupsRepositorie.findById(data.groupsId);

    if (!group) {
      return {
        message: 'Group not found!',
      };
    }

    const userCreated = await UserRepositorie.create(data);

    return userCreated;
  }

  async update(userId: string, data: UserCreteRequest): Promise<User[]> {
    const userUpdated = await UserRepositorie.update(userId, data);

    return userUpdated;
  }

  async delete(userId: string): Promise<MessageResponse> {
    await UserRepositorie.update(userId, {
      removedIn: new Date(),
    });

    return {
      message: 'User successfully deleted!',
    };
  }

  async retrieve(userId: string): Promise<MessageResponse> {
    const userDeleted = await UserRepositorie.retrieve(userId);

    if (userDeleted) {
      return {
        message: `User ${userDeleted[0].userId} successfully retrieved!`,
      };
    }

    return {
      message: `Error retrieving user.`,
    };
  }
}

export default new UserService();

interface UserCreteRequest {
  firstName: string;
  lastName: string;
  email: string;
  groupsId: string;
}

interface MessageResponse {
  message: string;
}
