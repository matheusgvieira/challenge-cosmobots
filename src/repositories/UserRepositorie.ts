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

  async retrieve(userId: string): Promise<User[] | undefined> {
    const userRemoved = await this.findAll('us')
      .where('us.userId', userId)
      .whereNotNull('removedIn')
      .orderBy('removedIn', 'desc')
      .first();

    if (userRemoved?.userId) {
      const userRetrieved = await this.update(userRemoved?.userId, {
        removedIn: null,
      });

      return userRetrieved;
    }
  }
}

export default new UserRepositorie();
