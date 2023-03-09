import express, { Router } from 'express';

import { fetchProducts, fetchProduct } from '../controllers/product.js';

const router = express.Router();

/* READ */
router.get('/:mode', fetchProducts);

router.get('/item/:productId', fetchProduct);

export default router;
