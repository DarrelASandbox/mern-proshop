import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js';
import {
  adminMiddleware,
  authMiddleware,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(authMiddleware, addOrderItems)
  .get(authMiddleware, adminMiddleware, getAllOrders);

router.route('/myorders').get(authMiddleware, getMyOrders);
router.route('/:id').get(authMiddleware, getOrderById);
router.route('/:id/pay').patch(authMiddleware, updateOrderToPaid);
router
  .route('/:id/deliver')
  .patch(authMiddleware, adminMiddleware, updateOrderToDelivered);

export default router;
