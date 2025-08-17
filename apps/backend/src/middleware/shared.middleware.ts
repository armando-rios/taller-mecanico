import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ message: 'Invalid client ID format' });
    return;
  }
  next();
};
