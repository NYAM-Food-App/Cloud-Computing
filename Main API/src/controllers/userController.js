const userModel = require('../models/userModel');
const { calculateBMI, calculateDailyNeeds } = require('../utils/nutritionUtils');
const { calculateAge } = require('../utils/dateUtils');
const { calculateBMRRate } = require('../utils/bmrUtils');

const userController = {
  /**
   * Retrieve user profile based on UID
   */
  async getUserProfile(req, res) {
    try {
      const { uid } = req.params;
      // Get user data from the database
      const user = await userModel.getUser(uid);

      // If the user is not found, send a 404 response
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Send user profile data in the response
      res.status(200).json(user);
    } catch (error) {
      // Handle server errors
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },

  /**
   * Update user profile based on UID
   */
  async updateUserProfile(req, res) {
    try {
      const { uid } = req.params;
      const { fullname, birthdate, gender, allergy, height, weight } = req.body;

      // Validate mandatory fields
      if (!fullname || !birthdate || gender === undefined || !height || !weight) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Calculate age from birthdate
      const age = calculateAge(birthdate);

      // Retrieve the existing user to keep their fulfilledNeeds intact
      const existingUser = await userModel.getUser(uid);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Recalculate BMI, daily needs, and BMR rate
      const bmi = calculateBMI(weight, height);
      const dailyNeeds = calculateDailyNeeds(weight, height, age, gender);
      const bmrRate = await calculateBMRRate(gender, height, weight, bmi); // Call the BMR API

      // Prepare the data to be updated
      const updateData = {
        fullname,
        birthdate,
        gender,
        allergy: allergy || null, // Set to null if not provided
        height,
        weight,
        bmi,
        dailyNeeds,
        bmrRate,
      };

      // Update the user profile while retaining fulfilledNeeds
      await userModel.updateUser(uid, { ...updateData, fulfilledNeeds: existingUser.fulfilledNeeds });

      // Respond with success message and updated data
      res.status(200).json({ message: 'User profile updated successfully!', updatedData: updateData });
    } catch (error) {
      // Handle server errors
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },
};

module.exports = userController;
