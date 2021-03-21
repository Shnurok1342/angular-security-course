import {Request, Response} from 'express';

export function loginAsUser(req: Request, res: Response) {
  res.status(200).json({
    id: 1,
    email: 'temp@gmail.com',
    roles: ['STUDENT']
  });
}
