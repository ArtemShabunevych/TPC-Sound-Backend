import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {

  // Метод для завантаження обкладинок (із витягуванням палітри кольорів)
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'soundgravity/covers',
          colors: true, // Змушує Cloudinary аналізувати та повертати кольори зображення
          transformation: [{ width: 500, height: 500, crop: 'limit' }], // Оптимізація розміру на льоту
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  // Метод для завантаження аудіотреків .mp3
  async uploadAudio(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'soundgravity/audio',
          resource_type: 'video', // Cloudinary сприймає аудіофайли як категорію video
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}