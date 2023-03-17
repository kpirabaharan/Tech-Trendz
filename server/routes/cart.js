import { Router } from 'express';

import {
  fetchCart,
  addToCart,
  removeFromCart,
  removeAllFromCart,
} from '../controllers/cart.js';

const router = Router();

/* Read */
router.get('/:userId', fetchCart);

/* Manipulate Cart */
router.post('/add', addToCart);

router.post('/remove', removeFromCart);

router.post('/removeAll', removeAllFromCart);

export default router;
