import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export async function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
