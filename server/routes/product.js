import express, { Router } from 'express';

import { fetchProducts } from '../controllers/product.js';

const router = express.Router();

/* READ */
router.get('/:mode', fetchProducts);

export default router;
