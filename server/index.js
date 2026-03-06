import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { connectDB } from './config/db.js';
import applicationsRouter from './routes/applications.js';
import adminRouter from './routes/admin.js';

await connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/api/applications', applicationsRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'Video file too large (max 100MB)' });
  }
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
