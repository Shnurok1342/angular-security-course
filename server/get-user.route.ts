import {Request, Response} from 'express';
import {sessionStore} from './session-store';

export function getUser(req: Request, res: Response) {
  const sessionId = req.cookies['SESSION_ID'];
  const user = sessionStore.findUserBySessionId(sessionId);
  if (user) {
    res.status(200).json(user);
  } {
    res.sendStatus(204);
  }
}
