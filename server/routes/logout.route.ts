import {Request, Response} from 'express';

export function logout(req: Request, res: Response) {
  res.clearCookie('SESSION_ID');
  res.clearCookie('XSRF-TOKEN');
  res.sendStatus(204);
}
