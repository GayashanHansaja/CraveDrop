// src/route/product.route.js

import express from 'express';
import { createProduct, getAllProducts, getProductsById } from '../controller/product.controller.js';

const router = express.Router();

router.post('/', createProduct); 
router.get('/:id', getProductsById); 
router.get('/', getAllProducts); 

export default router;
