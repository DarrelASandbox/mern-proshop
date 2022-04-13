import express from 'express';
import {
  deleteProduct,
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import {
  adminMiddleware,
  authMiddleware,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(authMiddleware, adminMiddleware, deleteProduct);

export default router;
