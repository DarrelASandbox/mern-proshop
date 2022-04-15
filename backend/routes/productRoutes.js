import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
} from '../controllers/productController.js';
import {
  adminMiddleware,
  authMiddleware,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(authMiddleware, adminMiddleware, createProduct);

router.get('/top', getTopRatedProducts);

router
  .route('/:id')
  .get(getProductById)
  .delete(authMiddleware, adminMiddleware, deleteProduct)
  .patch(authMiddleware, adminMiddleware, updateProduct);

router.route('/:id/reviews').post(authMiddleware, createProductReview);

export default router;
