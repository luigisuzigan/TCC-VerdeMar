import jwt from 'jsonwebtoken';
import { findUserById } from '../repos/userRepo.js';

export function authMiddleware(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev');
    const user = findUserById(payload.sub);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = { id: user.id, email: user.email, name: user.name, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
  next();
}
