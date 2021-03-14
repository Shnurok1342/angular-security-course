import {db} from './database';
import {Request, Response} from 'express';
import {sessionStore} from './session-store';

export function readAllLessons(req: Request, res: Response) {
  const sessionId = req.cookies['SESSION_ID'];
  const isSessionValid = sessionStore.isSessionValid(sessionId);
  if (!isSessionValid) {
    res.sendStatus(403);
  } else {
    res.status(200).json({ lessons: db.readAllLessons() });
  }
}
