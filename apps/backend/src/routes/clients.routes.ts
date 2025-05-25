import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { getClients, createClient } from '../controllers/clients.controller';

const router = Router();

router.get('/clients', protect, (req, res) => {
  getClients(req, res);
});

router.post('/clients', protect, (req, res) => {
  createClient(req, res);
});

export default router;
