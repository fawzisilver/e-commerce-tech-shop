import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
// import products from '../data/products.js';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

/**
 * mounted in server.js
 */
// /api/products/
router.route('/').get(getProducts).post(protect, admin, createProduct);

// /api/products/:id
router.route('/:id').get(getProductById)
.put(protect, admin, updateProduct)
.delete(protect, admin, deleteProduct);


export default router;


