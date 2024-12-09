const axios = require('axios');
const dotenv = require('dotenv');
const FormData = require('form-data');

// Load environment variables
dotenv.config();

const nyamFlaskApiUrl = process.env.NYAM_FLASK_API;

const axiosInstance = axios.create({
  baseURL: nyamFlaskApiUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * Sends an image to the external food recognition API for prediction.
 * @param {Object} image - The image object containing the buffer.
 * @returns {Promise<Object>} The API response data.
 * @throws {Error} Throws an error if the image is invalid or the API request fails.
 */
const sendImageToFoodRecognitionApi = async (image) => {
  try {
    // Ensure a valid image is provided
    if (!image || !image.buffer) {
      throw new Error('No image provided or invalid image');
    }

    // Create FormData and append the image file
    const formData = new FormData();
    formData.append('file', image.buffer, { filename: 'image.jpg', contentType: 'image/jpeg' });

    // Send the image to the external API
    const response = await axiosInstance.post('/food', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return response.data; // Return API response data
  } catch (error) {
    // Handle specific Flask API errors (e.g., 400 Bad Request)
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data.message || 'Image prediction failed.');
    }

    // Throw other errors
    throw new Error(error.message || 'Internal Server Error');
  }
};

module.exports = {
  sendImageToFoodRecognitionApi,
};
