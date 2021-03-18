import {Request, Response} from 'express';
import {db} from '../database';

export function userInfo(req: Request, res: Response) {
  const userData = req['user'];
  console.log('Checking if user existrs:', userData);
  let user = db.findUserByEmail(userData.email);
  if (!user) {
    user = db.createUser(userData.email, userData.sub);
  }
  res.status(200).json({ id: user.id, email: user.email });
}
