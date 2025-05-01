import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { getParts, createPart } from '../controllers/parts.controller';

const router = Router();

router.get('/parts', protect, (req, res) => {
  getParts(req, res);
});

router.post('/parts', protect, (req, res) => {
  createPart(req, res);
});

export default router;
