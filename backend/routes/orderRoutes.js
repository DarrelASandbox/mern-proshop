import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(authMiddleware, addOrderItems);
router.route('/:id').get(authMiddleware, getOrderById);
router.route('/:id/pay').patch(authMiddleware, updateOrderToPaid);

export default router;
