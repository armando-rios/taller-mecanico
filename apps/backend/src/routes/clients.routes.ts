import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import {
  getClients,
  createClient,
  deleteClient,
  getClientById,
} from '../controllers/clients.controller';
import { validateClient } from '../middleware/client.middleware';
import { validateObjectId } from '../middleware/shared.middleware';

const router = Router();

router.get('/clients', protect, getClients);

router.post('/clients', protect, validateClient, createClient);

router.get('/clients/:id', protect, validateObjectId, getClientById);

router.delete('/clients/:id', protect, validateObjectId, deleteClient);

export default router;
