import Part from '../models/Part.model';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';

interface RequestWithUser extends Request {
  user?: IUser;
}

export const getParts = async (req: RequestWithUser, res: Response) => {
  try {
    console.log(req.user);
    const parts = await Part.find();

    if (!parts) {
      throw new Error('Parts not found');
    }

    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createPart = async (req: RequestWithUser, res: Response) => {
  try {
    const part = await Part.create(req.body);

    if (!part) {
      throw new Error('Part not created');
    }

    res.status(201).json(part);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
