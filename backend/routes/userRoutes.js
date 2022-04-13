import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} from '../controllers/userController.js';
import {
  authMiddleware,
  adminMiddleware,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(registerUser)
  .get(authMiddleware, adminMiddleware, getAllUsers);

router.post('/login', authUser);

router
  .route('/profile')
  .get(authMiddleware, getUserProfile)
  .patch(authMiddleware, updateUserProfile);

router.route('/:id').delete(authMiddleware, adminMiddleware, deleteUser);

export default router;
