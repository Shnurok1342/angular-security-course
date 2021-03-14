const util = require('util');
const crypto = require('crypto');
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const moment = require('moment');

export const randomBytes = util.promisify(crypto.randomBytes);
export const signJwn = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/JWT/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./demos/JWT/public.key');
const SESSION_DURATION = 240;

export async function createSessionToken(userId: string) {
  return signJwn({}, RSA_PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: SESSION_DURATION,
    subject: userId
  });
}

export async function decodeJwt(token: string) {
  const payload = await jwt.verify(token, RSA_PUBLIC_KEY);
  console.log('decoded JWT payload:', payload);
  return payload;
}
