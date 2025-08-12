import { NextFunction, Request, Response } from 'express';
import { IClient } from '../interfaces/client.interface';

export const validateClient = (req: Request, res: Response, next: NextFunction) => {
  const client: IClient = req.body;
  if (!client.ci || !client.firstName || !client.lastName || !client.phone) {
    res.status(400).json({ message: 'Missing required client fields' });
    return;
  }
  next();
};
