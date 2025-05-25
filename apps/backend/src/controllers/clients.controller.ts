import Client from '../models/Client.model';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';

interface RequestWithUser extends Request {
  user?: IUser;
}

export const getClients = async (req: RequestWithUser, res: Response) => {
  try {
    const clients = await Client.find();

    if (!clients) {
      throw new Error('Clients not found');
    }

    console.log(req.user);

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.create(req.body);

    if (!client) {
      throw new Error('Client not created');
    }

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
