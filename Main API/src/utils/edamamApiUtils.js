const axios = require('axios');
require('dotenv').config();

const EDAMAM_URL = process.env.EDAMAM_URL;

/**
 * Queries the Edamam API for recipes based on search parameters.
 * @param {string} query - Search query (e.g., ingredient or dish name).
 * @param {Object} options - Additional query options (health, cuisineType, mealType, nutrients).
 * @returns {Promise<Object>} The response data from the Edamam API.
 */
const queryEdamamApi = async (query, options = {}) => {
  const { EDAMAM_APP_ID, EDAMAM_APP_KEY, EDAMAM_ACCOUNT_USER } = process.env;
  const {
    health = [],
    cuisineType = [],
    mealType = [],
    nutrients = {},
  } = options;

  // Construct the base URL with required query parameters
  let url = `${EDAMAM_URL}?type=public&q=${encodeURIComponent(query)}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;

  // Append health, cuisineType, and mealType parameters if provided
  if (health.length > 0) {
    url += `&health=${health.join('&health=')}`;
  }
  if (cuisineType.length > 0) {
    url += `&cuisineType=${cuisineType.join('&cuisineType=')}`;
  }
  if (mealType.length > 0) {
    url += `&mealType=${mealType.join('&mealType=')}`;
  }

  // Append nutrients parameters if provided
  Object.keys(nutrients).forEach((key) => {
    url += `&nutrients%5B${key}%5D=${nutrients[key]}`;
  });

  console.log('Request URL to Edamam:', url); // Debugging: log the request URL

  try {
    const response = await axios.get(url, {
      headers: {
        'Edamam-Account-User': EDAMAM_ACCOUNT_USER,
        'Accept-Language': 'id', // Set language preference to Indonesian
      },
    });

    return response.data; // Return API response data
  } catch (error) {
    console.error('Error calling Edamam API:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch recipes from Edamam');
  }
};

module.exports = { queryEdamamApi };