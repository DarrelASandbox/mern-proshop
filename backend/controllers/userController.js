import asyncHandler from 'express-async-handler';
import { User } from '../models/index.js';
import generateToken from '../utils/generateToken.js';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password)))
    res.json({
      _id: user._id,
      name: user.name,
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
      name: user.name,
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
  const { user } = req;
  if (user)
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  else {
    res.status(404);
    throw new Error('User not found');
  }
});

/*
Similar to the getUserProfile controller,
we already have the user's profile from our authMiddleware,
so we don't really need to make an additional query to the DB
to get the same information again.
We can use the user we just queried when we authenticated them.

Will: Note - I'm not sending a token here as I'm using http only cookies and
https local development (for secure and sameSite cookies), instead of LS,
so you may want to add the token in the response,
though the one the user has in the client already will be valid so not strictly necessary.
*/

const updateUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { name, email, password } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;

  const updatedUser = await user.save();
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(updatedUser._id),
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
};
