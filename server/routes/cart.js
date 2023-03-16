import { Router } from 'express';

import { addToCart, removeFromCart } from '../controllers/cart.js';

const router = Router();

router.post('/add', addToCart);

// router.post('/login', login);

export default router;
