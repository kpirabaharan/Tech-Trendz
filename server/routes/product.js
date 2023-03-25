import { Router } from 'express';

import {
  fetchProducts,
  carouselProducts,
  fetchProduct,
} from '../controllers/product.js';

const router = Router();

/* READ */
router.get('/', fetchProducts);

router.get('/carousel', carouselProducts);

router.get('/item/:productId', fetchProduct);

export default router;
