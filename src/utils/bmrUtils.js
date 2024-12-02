const axios = require('axios');

// Import dotenv untuk membaca variabel lingkungan
require('dotenv').config();

const bmrUtils = {
  /**
   * Menghitung BMR Rate menggunakan API eksternal
   * @param {number} gender - Jenis kelamin (0 untuk pria, 1 untuk wanita)
   * @param {number} height - Tinggi badan dalam cm
   * @param {number} weight - Berat badan dalam kg
   * @param {number} bmi - BMI yang telah dihitung
   * @returns {Promise<number>} Nilai predicted_index (bmrRate)
   */
  async calculateBMRRate(gender, height, weight, bmi) {
    try {
      // Pastikan input dalam bentuk integer
      const requestBody = {
        gender: parseInt(gender),
        height: parseInt(height),
        weight: parseInt(weight),
        bmi: parseInt(bmi),
      };

      // Panggil API menggunakan Axios
      const response = await axios.post(
        `${process.env.NYAM_FLASK_API}/bmr`,
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Ambil nilai predicted_index dari respons
      return response.data.prediction.predicted_index;
    } catch (error) {
      console.error('Error fetching BMR rate:', error.message);
      throw new Error('Failed to calculate BMR rate');
    }
  },
};

module.exports = bmrUtils;
