import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User.model';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user.interface';

interface RequestWithUser extends Request {
  user?: IUser;
}

export const protect = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({
        message: (error as Error).message,
      });
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};
