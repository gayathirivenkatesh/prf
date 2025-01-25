import express from 'express';
import { generateToken } from '../utils/jwtUtils.js';

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Mock user validation (replace with database check)
  const user = { id: 1, email: 'test@example.com', password: 'password123' };

  if (email === user.email && password === user.password) {
    const token = generateToken(user.id);
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid email or password' });
});

// Protected Route Example
router.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyToken(token);
      return res.json({ message: 'Access granted', user: decoded });
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  }

  return res.status(401).json({ message: 'Authorization required' });
});

export default router;
