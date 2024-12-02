const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const EDAMAM_API_URL = 'https://api.edamam.com/api/recipes/v2';

const queryEdamamApi = async (query, options = {}) => {
    const { EDAMAM_APP_ID, EDAMAM_APP_KEY, EDAMAM_ACCOUNT_USER } = process.env;

    const {
        health = [],
        cuisineType = [],
        mealType = [],
        nutrients = {},
    } = options;

    // Menggunakan let untuk mendeklarasikan url sehingga bisa dimodifikasi
    let url = `${EDAMAM_API_URL}?type=public&q=${encodeURIComponent(query)}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;

    // Menambahkan parameter `health`, `mealType`, dan `cuisineType` ke URL jika ada
    if (health.length > 0) {
        url += `&health=${health.join('&health=')}`;
    }
    if (cuisineType.length > 0) {
        url += `&cuisineType=${cuisineType.join('&cuisineType=')}`;
    }
    if (mealType.length > 0) {
        url += `&mealType=${mealType.join('&mealType=')}`;
    }

    // Menambahkan parameter `nutrients` jika ada
    if (nutrients) {
        Object.keys(nutrients).forEach(key => {
            url += `&nutrients%5B${key}%5D=${nutrients[key]}`;
        });
    }

    // Debugging: log the URL
    console.log('Request URL to Edamam:', url);

    try {
        const response = await axios.get(url, {
            headers: {
                'Edamam-Account-User': EDAMAM_ACCOUNT_USER,
                'Accept-Language': 'id',
            },
        });

        return response.data; // Mengembalikan data dari API Edamam
    } catch (error) {
        console.error("Error calling Edamam API:", error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch recipes from Edamam');
    }
};

module.exports = { queryEdamamApi };
