import * as _ from 'lodash';
import {LESSONS, USERS} from './database-data';
import {DbUser} from './db-user';

class InMemoryDatabase {
  userCounter = 0;

  readAllLessons() {
    return _.values(LESSONS);
  }

  createUser(email: string, passwordDigest: string) {
    const usersPerEmail = _.keyBy(_.values(USERS), 'email');
    if (usersPerEmail[email]) {
      const message = `An user already exists with email ${email}`;
      console.error(message);
      throw new Error(message);
    }
    this.userCounter = this.userCounter + 1;
    const id = this.userCounter;
    const user: DbUser = {
      id,
      email,
      passwordDigest
    };
    USERS[id] = user;
    console.log(USERS);

    return user;
  }

  findUserByEmail(email) {
    const usersPerEmail = _.keyBy(_.values(USERS), 'email');
    return usersPerEmail[email];
  }

  findUserById(userId: string): DbUser {
    let user;
    if (userId) {
      const users = _.values(USERS);
      user = _.find(users, u => u.id.toString() === userId);
      console.log('user data found:', user);
    }
    return user;
  }
}

export const db = new InMemoryDatabase();
