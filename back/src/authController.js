import bcrypt from 'bcryptjs';
import { db } from './db.js';
import User from './User.js';
import generateToken from './generateToken.js';
import { registerSchema, loginSchema } from './userValidator.js';
import { sendWelcomeEmail } from './emailService.js';

// Register new user
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = db.users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = Date.now().toString(); // Simple ID generation
    const user = new User({
      id: userId,
      name,
      email,
      password: hashedPassword,
    });

    // Save to "database"
    db.users.push(user);

    // Send welcome email (placeholder)
    await sendWelcomeEmail(email, name);

    // Generate token
    const token = generateToken({ id: user.id, email: user.email });

    res.status(201).json({
      message: 'User registered successfully',
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user
    const user = db.users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken({ id: user.id, email: user.email });

    res.json({
      message: 'Login successful',
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    next(error);
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  res.json({
    user: req.user.toJSON()
  });
};

// Logout (client-side token removal)
export const logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
