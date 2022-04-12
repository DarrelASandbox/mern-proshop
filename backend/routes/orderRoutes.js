import express from 'express';
import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(authMiddleware, addOrderItems);
router.route('/:id').get(authMiddleware, getOrderById);

export default router;
