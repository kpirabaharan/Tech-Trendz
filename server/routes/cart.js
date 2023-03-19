import { Router } from 'express';

import {
  fetchCart,
  addToCart,
  removeFromCart,
  removeAllFromCart,
  clearCart,
} from '../controllers/cart.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

/* Read */
router.get('/:userId', verifyToken, fetchCart);

/* Manipulate Cart */
router.post('/add', verifyToken, addToCart);

router.post('/remove', verifyToken, removeFromCart);

router.post('/removeAll', verifyToken, removeAllFromCart);

router.post('/clear', verifyToken, clearCart);

export default router;
