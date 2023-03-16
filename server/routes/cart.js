import { Router } from 'express';

import { fetchCart, addToCart, removeFromCart } from '../controllers/cart.js';

const router = Router();

/* Read */
router.get('/:userId', fetchCart);

/* Manipulate Cart */
router.post('/add', addToCart);

// router.post('/login', login);

export default router;
