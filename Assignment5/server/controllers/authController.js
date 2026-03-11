import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  const user = await User.create({ name, email, password });

  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  return res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found.' });

  user.name = req.body.name || user.name;
  user.phone = req.body.phone ?? user.phone;
  user.address = req.body.address ?? user.address;
  if (req.body.password) user.password = req.body.password;

  const updated = await user.save();
  return res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    phone: updated.phone,
    address: updated.address,
    role: updated.role,
  });
};
