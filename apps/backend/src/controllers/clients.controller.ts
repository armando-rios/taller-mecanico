import Client from '../models/Client.model';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';

interface RequestWithUser extends Request {
  user?: IUser;
}

export const getClients = async (_req: RequestWithUser, res: Response) => {
  try {
    const clients = await Client.find();

    if (!clients) {
      throw new Error('Clients not found');
    }

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const client = await Client.create(data);

    if (!client) {
      throw new Error('Client not created');
    }

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
