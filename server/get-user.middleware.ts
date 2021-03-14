import {NextFunction, Request, Response} from 'express';
import {decodeJwt} from './security.utils';

export function retrieveUserIdFromRequest(req: Request, res: Response, next: NextFunction) {
  const jwt = req.cookies['SESSION_ID'];
  if (jwt) {
    handleSessionCookie(jwt, req)
      .then(() => next())
      .catch(err => {
        console.error(err);
        next();
      })
    ;
  }
}

async function handleSessionCookie(jwt: string, req: Request) {
  try {
    const payload = await decodeJwt(jwt);
    req['userId'] = payload.sub;
  } catch (e) {
    console.error('Error: Could not extract user from request', e);
  }
}

