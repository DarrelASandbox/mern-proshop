import asyncHandler from 'express-async-handler';
import { User } from '../models/index.js';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password)))
    res.json({
      _id: user._id,
      name: user._name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

export { authUser };
