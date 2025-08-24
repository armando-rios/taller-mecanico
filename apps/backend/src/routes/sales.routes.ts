import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { createSale } from '../controllers/sales.controller';

const router = Router();

router.post('/sales', protect, createSale);

export default router;
