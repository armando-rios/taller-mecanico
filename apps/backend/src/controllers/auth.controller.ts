import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

interface RequestWithUser extends Request {
  user?: IUser;
}

const generateToken = (id: ObjectId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, username, password, rol } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(400).json({
        message: 'The user already exists',
      });
      throw new Error('The user already exists');
    }

    if (rol && !['admin', 'tecnico', 'vendedor'].includes(rol)) {
      res.status(400).json({
        message: 'Invalid rol',
      });
      throw new Error('Invalid rol');
    }

    const user = await User.create({
      name,
      username,
      password,
      rol,
    });

    if (!user) {
      throw new Error('User not created');
    }

    return res.status(201).json({
      id: user._id,
      name: user.name,
      username: user.username,
      rol: user.rol,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      username: user.username,
      rol: user.rol,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const getUsers = async (_req: RequestWithUser, res: Response) => {
  try {
    const users = await User.find();

    if (!users) {
      throw new Error('Users not found');
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};
