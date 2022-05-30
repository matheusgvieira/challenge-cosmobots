import Model from '../models/Model';

import User from '../entity/User';

class UserRepositorie extends Model<User> {
  constructor() {
    super('user');
  }

  list(): Promise<User[]> {
    return this.findAll();
  }
}

export default new UserRepositorie();
