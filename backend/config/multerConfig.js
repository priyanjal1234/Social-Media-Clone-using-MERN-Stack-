const multer = require('multer');
const cloudinary = require('./cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Define Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures', // Specify folder name in Cloudinary
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // Set size limit for uploads
});

module.exports = upload;
