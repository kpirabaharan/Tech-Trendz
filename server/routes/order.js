import { Router } from 'express';

import { getOrder, postOrder } from '../controllers/order.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

/* Read */
router.get('/:userId', verifyToken, getOrder);

/* Write */
router.post('/', verifyToken, postOrder);

export default router;
