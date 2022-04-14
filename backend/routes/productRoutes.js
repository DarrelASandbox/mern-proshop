import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
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

router
  .route('/:id')
  .get(getProductById)
  .delete(authMiddleware, adminMiddleware, deleteProduct)
  .patch(authMiddleware, adminMiddleware, updateProduct);

export default router;
