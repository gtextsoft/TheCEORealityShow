import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'change-me';

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Admin already exists for', email);
    process.exit(0);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({ email, passwordHash });
  console.log('Admin created:', email);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
