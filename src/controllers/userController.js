const userModel = require('../models/userModel');
const { calculateBMI, calculateDailyNeeds } = require('../utils/nutritionUtils');
const { calculateAge } = require('../utils/dateUtils');
const { calculateBMRRate } = require('../utils/bmrUtils');

const userController = {
  /**
   * Mendapatkan profil pengguna berdasarkan UID
   */
  async getUserProfile(req, res) {
    try {
      const { uid } = req.params;
      const user = await userModel.getUser(uid);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },

  /**
   * Memperbarui profil pengguna berdasarkan UID
   */
  async updateUserProfile(req, res) {
    try {
      const { uid } = req.params;
      const { fullname, birthdate, gender, allergy, height, weight } = req.body;

      // Validasi data wajib
      if (!fullname || !birthdate || gender === undefined || !height || !weight) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Hitung usia
      const age = calculateAge(birthdate);


      // Ambil data user yang ada untuk mempertahankan fulfilledNeeds
      const existingUser = await userModel.getUser(uid);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Hitung ulang BMI, BMR dan dailyNeeds
      const bmi = calculateBMI(weight, height);
      const dailyNeeds = calculateDailyNeeds(weight, height, age, gender);
      const bmrRate = await calculateBMRRate(gender, height, weight, bmi); // Panggil API BMR


      // Siapkan data untuk diperbarui
      const updateData = {
        fullname,
        birthdate,
        gender,
        allergy: allergy || null, // Default null jika tidak diisi
        height,
        weight,
        bmi,
        dailyNeeds,
        bmrRate,
      };

      // Update data tanpa mengubah fulfilledNeeds
      await userModel.updateUser(uid, { ...updateData, fulfilledNeeds: existingUser.fulfilledNeeds });

      res.status(200).json({ message: 'User profile updated successfully!', updatedData: updateData });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },
};

module.exports = userController;