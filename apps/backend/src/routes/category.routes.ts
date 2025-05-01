import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';

import { getCategories, createCategory } from '../controllers/category.controller';

const router = Router();

router.route('/').get(protect, getCategories).post(protect, createCategory);

export default router;
