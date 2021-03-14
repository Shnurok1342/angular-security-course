import {Request, Response} from 'express';

export function logout(req: Request, res: Response) {
  res.clearCookie('SESSION_ID');
  res.sendStatus(204);
}
