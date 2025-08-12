import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { getClients, createClient } from '../controllers/clients.controller';
import { validateClient } from '../middleware/client.middleware';

const router = Router();

router.get('/clients', protect, getClients);

router.post('/clients', protect, validateClient, createClient);

export default router;
