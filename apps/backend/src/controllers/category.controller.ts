import { Request, Response } from 'express';
import Category from '../models/Category.model';
import { IUser } from '../interfaces/user.interface';

interface RequestWithUser extends Request {
  user?: IUser;
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);

    if (!category) {
      throw new Error('Category not created');
    }

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getCategories = async (_req: RequestWithUser, res: Response) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      throw new Error('Categories not found');
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
