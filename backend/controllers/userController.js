import asyncHandler from 'express-async-handler';
import { User } from '../models/index.js';
import generateToken from '../utils/generateToken.js';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password)))
    res.json({
      _id: user._id,
      name: user._name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    res.status(400);
    throw new Error('Email is taken.');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user._name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user)
    return res.json({
      _id: user._id,
      name: user._name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, registerUser, getUserProfile };
