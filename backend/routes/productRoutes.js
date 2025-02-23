import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
// import products from '../data/products.js';
import { getProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        createProductReview,
        getTopProducts } from '../controllers/productController.js';

const router = express.Router();

/**
 * mounted in server.js
 */
// /api/products/
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts)

// /api/products/:id
router.route('/:id').get(getProductById)
.put(protect, admin, updateProduct)
.delete(protect, admin, deleteProduct);


router.route('/:id/reviews').post(protect, createProductReview)


export default router;


