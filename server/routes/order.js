import { Router } from 'express';

import { getOrder, postOrder, successfulOrder } from '../controllers/order.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

/* Read */
router.get('/:userId', verifyToken, getOrder);

/* Write */
router.post('/', verifyToken, postOrder);

router.post('/success', verifyToken, successfulOrder);

export default router;
