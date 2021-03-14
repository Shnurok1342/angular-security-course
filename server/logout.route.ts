import {Request, Response} from 'express';
import {sessionStore} from './session-store';

export function logout(req: Request, res: Response) {
  const sessionId = req.cookies['SESSION_ID'];
  sessionStore.destroySession(sessionId);
  res.clearCookie('SESSION_ID');
  res.sendStatus(204);
}
