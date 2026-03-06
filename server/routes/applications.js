import { Router } from 'express';
import Application from '../models/Application.js';
import { uploadVideo } from '../middleware/upload.js';
import cloudinary from '../config/cloudinary.js';
import { getStream } from '../utils/cloudinaryUpload.js';

const router = Router();

router.post('/', uploadVideo, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      state,
      age,
      occupation,
      experience,
      whyYou,
      socials,
      referral,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !state || !occupation || !experience || !whyYou || !socials || !referral) {
      return res.status(400).json({
        error: 'Missing required fields: firstName, lastName, email, phone, state, age, occupation, experience, whyYou, socials, referral',
      });
    }

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 21 || ageNum > 70) {
      return res.status(400).json({ error: 'Age must be between 21 and 70' });
    }

    let videoUrl = null;
    let videoPublicId = null;

    if (req.file) {
      const result = await getStream(req.file.buffer, req.file.mimetype);
      videoUrl = result.secure_url;
      videoPublicId = result.public_id;
    }

    const application = await Application.create({
      firstName,
      lastName,
      email,
      phone,
      state,
      age: ageNum,
      occupation,
      experience,
      whyYou,
      socials,
      videoUrl,
      videoPublicId,
      referral,
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      id: application._id,
    });
  } catch (err) {
    if (err.message?.includes('Only video files')) {
      return res.status(400).json({ error: 'Only video files are allowed' });
    }
    console.error('Application submit error:', err);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

export default router;
