import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { getParts, createPart, deletePart, updatePart } from '../controllers/parts.controller';

const router = Router();

router.get('/parts', protect, (req, res) => {
  getParts(req, res);
});

router.post('/parts', protect, (req, res) => {
  createPart(req, res);
});

router.put('/parts/:id', protect, (req, res) => {
  updatePart(req, res);
});

router.delete('/parts/:id', protect, (req, res) => {
  deletePart(req, res);
});

export default router;
