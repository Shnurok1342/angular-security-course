import {Request, Response} from 'express';
import {db} from '../database';
import {DbUser} from '../models/db-user';
import * as argon2 from 'argon2';
import {createCsrfToken, createSessionToken} from '../utils/security.utils';

export function login(req: Request, res: Response) {
  const credentials = req.body;
  const user = db.findUserByEmail(credentials.email);
  if (!user) {
    res.sendStatus(403);
  } else {
    loginAndBuildResponse(credentials, user, res).then(() => {});
  }
}

async function loginAndBuildResponse(credentials, user: DbUser, res: Response) {
  try {
    const sessionToken = await attemptLogin(credentials, user);
    const csrfToken = await createCsrfToken(sessionToken);
    res.cookie('SESSION_ID', sessionToken, { httpOnly: true, secure: true });
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({id: user.id, email: user.email});
  } catch (e) {
    console.log('Login failed');
    res.sendStatus(403);
  }
}

async function attemptLogin(credentials, user: DbUser) {
  const isPasswordValid = await argon2.verify(user.passwordDigest, credentials.password);
  if (!isPasswordValid) {
    throw new Error('Password Invalid');
  }
  return createSessionToken(user.id.toString());
}
