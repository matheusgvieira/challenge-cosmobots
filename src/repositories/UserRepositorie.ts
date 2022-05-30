import Model from '../models/Model';

import User from '../entity/User';

class UserRepositorie extends Model<User> {
  constructor() {
    super('user');
  }

  list(): Promise<User[]> {
    return this.findAll();
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.findOne().where({ email });
  }

  async retrieve(userId: string): Promise<User[]> {
    const userRetrieved = await this.findAll()
      .orderBy('removedIn', 'desc')
      .first();

    const userCreated = await this.create({
      firstName: userRetrieved?.firstName,
      lastName: userRetrieved?.lastName,
      email: userRetrieved?.email,
      groupsId: userRetrieved?.groupsId,
    });

    return userCreated;
  }
}

export default new UserRepositorie();
