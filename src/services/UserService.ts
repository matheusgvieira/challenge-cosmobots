import User from 'entity/User';
import UserRepositorie from '../repositories/UserRepositorie';

class UserService {
  async list(): Promise<User[]> {
    const users = await UserRepositorie.list();

    return users;
  }

  async show(): Promise<string> {
    return 'ola';
  }

  async create(): Promise<string> {
    return 'ola';
  }

  async update(): Promise<string> {
    return 'ola';
  }

  async delete(): Promise<string> {
    return 'ola';
  }
}

export default new UserService();
