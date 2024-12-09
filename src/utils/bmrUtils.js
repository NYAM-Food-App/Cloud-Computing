const axios = require('axios');
require('dotenv').config();

const bmrUtils = {
  /**
   * Calculate BMR rate using an external API
   * @param {number} gender - Gender (0 for male, 1 for female)
   * @param {number} height - Height in cm
   * @param {number} weight - Weight in kg
   * @param {number} bmi - Calculated BMI
   * @returns {Promise<number>} Predicted BMR rate (predicted_index)
   */
  async calculateBMRRate(gender, height, weight, bmi) {
    try {
      const requestBody = {
        gender: parseInt(gender),
        height: parseInt(height),
        weight: parseInt(weight),
        bmi: parseInt(bmi),
      };

      const response = await axios.post(
        `${process.env.NYAM_FLASK_API}/bmr`,
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      return response.data.prediction.predicted_index;
    } catch (error) {
      console.error('Error fetching BMR rate:', error.message);
      throw new Error('Failed to calculate BMR rate');
    }
  },
};

module.exports = bmrUtils;