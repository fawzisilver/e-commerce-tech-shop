import express from 'express'
// import products from '../data/products.js';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

/**
 * mounted in server.js
 */
// /api/products/
router.route('/').get(getProducts);

// /api/products/:id
router.route('/:id').get(getProductById);


export default router;


