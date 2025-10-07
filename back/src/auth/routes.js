import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repos/userRepo.js';
import { authMiddleware } from './middleware.js';

const router = Router();

const validators = [
  body('name').optional().isString().isLength({ min: 1, max: 120 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 6 }),
];

router.post('/register', validators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, password } = req.body;
  const existing = findUserByEmail(email);
  if (existing) return res.status(400).json({ error: 'Email já cadastrado' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({ name: name || email.split('@')[0], email, passwordHash });
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.post('/login', [body('email').isEmail(), body('password').isString()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.get('/me', authMiddleware, (req, res) => {
  return res.json({ user: req.user });
});

export default router;
