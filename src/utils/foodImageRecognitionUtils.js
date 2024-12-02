// src/utils/foodImageRecognitionUtils.js
const axios = require('axios');
const dotenv = require('dotenv');
const FormData = require('form-data');

// Memuat variabel dari file .env
dotenv.config();

const foodImageRecognitionApiUrl = process.env.FOOD_IMAGE_RECOGNITION_API_URL;

const axiosInstance = axios.create({
    baseURL: foodImageRecognitionApiUrl,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

const sendImageToFoodRecognitionApi = async (image) => {
    try {
        // Pastikan bahwa file gambar diterima dengan benar
        if (!image || !image.buffer) {
            throw new Error('No image provided or invalid image');
        }

        // Membuat FormData dan menambahkan file gambar
        const formData = new FormData();
        formData.append('file', image.buffer, { filename: 'image.jpg', contentType: 'image/jpeg' });

        // Mengirimkan gambar ke API eksternal
        const response = await axiosInstance.post('/food', formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error details:", JSON.stringify(error, null, 2));  // Log the detailed error
        throw new Error(error.response ? JSON.stringify(error.response.data) : 'Internal Server Error');
    }
};

module.exports = {
    sendImageToFoodRecognitionApi
};
