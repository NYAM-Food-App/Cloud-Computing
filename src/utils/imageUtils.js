const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { bucket } = require('../services/firebaseService'); // Ensure the bucket is imported from services
require('dotenv').config();

const GOOGLE_CLOUD_STORAGE_BUCKET = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;

/**
 * Cleans up a file name by replacing invalid characters with an underscore.
 * @param {string} name - The original file name.
 * @returns {string} The sanitized file name.
 */
const sanitizeFileName = (name) => {
  return name.replace(/[<>:"/\\|?*]+/g, '_'); // Replace illegal characters with '_'
};

/**
 * Downloads an image from a URL and uploads it to Google Cloud Storage.
 * @param {string} imageUrl - The URL of the image to be downloaded.
 * @param {string} fileName - The desired file name for the image.
 * @returns {Promise<string>} The public URL of the uploaded image.
 */
const downloadImageAndUpload = async (imageUrl, fileName) => {
  try {
    // Sanitize the file name to remove invalid characters
    const sanitizedFileName = sanitizeFileName(fileName);

    // Define the path for a temporary directory to store the downloaded file
    const tempDir = path.join(__dirname, 'temp');

    // Ensure the 'temp' directory exists; create it if not
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
      console.log('Temp directory created');
    }

    // Define the path for the temporary file
    const filePath = path.join(tempDir, sanitizedFileName);

    // Download the image from the URL
    const response = await axios({
      url: imageUrl,
      responseType: 'stream', // Read the image as a stream
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', async () => {
        try {
          // Upload the image to Google Cloud Storage
          await bucket.upload(filePath, {
            destination: `imagesFood/${sanitizedFileName}`,
            metadata: {
              contentType: 'image/jpeg', // Set the appropriate content type
            },
          });

          // Remove the temporary file after upload
          fs.unlinkSync(filePath);

          // Construct the public URL for the uploaded image
          const publicUrl = `https://storage.googleapis.com/${GOOGLE_CLOUD_STORAGE_BUCKET}/imagesFood/${sanitizedFileName}`;
          resolve(publicUrl);
        } catch (err) {
          console.error('Error uploading image to Cloud Storage:', err);
          reject('Error uploading image to Cloud Storage');
        }
      });

      writer.on('error', (err) => {
        console.error('Error writing file:', err);
        reject('Error writing file');
      });
    });
  } catch (error) {
    console.error('Error downloading image:', error.message);
    throw new Error('Error downloading or uploading image: ' + error.message);
  }
};

module.exports = { downloadImageAndUpload };
