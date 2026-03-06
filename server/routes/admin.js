import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import Application from '../models/Application.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await admin.comparePassword(password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/applications', requireAdmin, async (req, res) => {
  try {
    const applications = await Application.find()
      .sort({ createdAt: -1 })
      .lean();
    res.json(applications);
  } catch (err) {
    console.error('Get applications error:', err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

export default router;
