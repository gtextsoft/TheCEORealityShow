import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

/**
 * Upload a buffer to Cloudinary as a video stream
 */
export function getStream(buffer, mimeType) {
  return new Promise((resolve, reject) => {
    const readStream = Readable.from(buffer);
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        folder: 'ceo-reality-show-applications',
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    readStream.pipe(uploadStream);
  });
}
