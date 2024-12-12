const { admin } = require('../services/firebaseService');
const userModel = require('../models/userModel');
const { calculateBMI, calculateDailyNeeds } = require('../utils/nutritionUtils');
const { calculateAge } = require('../utils/dateUtils');
const { calculateBMRRate } = require('../utils/bmrUtils');

const authController = {
  /**
   * Register a new user with additional data
   */
  async register(req, res) {
    try {
      const { uid, fullname, birthdate, gender, allergy, height, weight } = req.body;
  
      // Validate input
      if (!uid || !fullname || !birthdate || gender === undefined || !height || !weight) {
        return res.status(400).json({ message: 'All required fields must be filled!' });
      }
  
      // Verify UID with Firebase Authentication
      let userRecord;
      try {
        userRecord = await admin.auth().getUser(uid); // Retrieve user data from Firebase Auth
        console.log('User verified:', userRecord.email); // Debugging log
      } catch (error) {
        return res.status(401).json({ message: 'Invalid UID: User not found in Firebase Authentication' });
      }

      // Check if the user already exists in Firestore
      const existingUser = await userModel.getUser(uid);
      if (existingUser) {
        return res.status(409).json({ message: 'User with this UID already exists!' }); // 409 Conflict
      }
  
      // Calculate age from birthdate
      const age = calculateAge(birthdate);

      // Calculate BMI
      const bmi = calculateBMI(weight, height);

      // Calculate BMR Rate using external API
      const bmrRate = await calculateBMRRate(gender, height, weight, bmi);

      // Prepare data for Firestore
      const userData = {
        fullname,
        email: userRecord.email || null, // Email from Firebase Authentication
        profilePicture: userRecord.photoURL || null, // Profile picture from Firebase Authentication
        birthdate,
        gender,
        allergy: allergy || null,
        height,
        weight,
        bmi,
        dailyNeeds: calculateDailyNeeds(weight, height, age, gender),
        fulfilledNeeds: {
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
        },
        bmrRate,
        createdAt: new Date().toISOString(),
      };
  
      // Save user data to Firestore
      await userModel.createUser(uid, userData);
      res.status(201).json({ message: 'User registered successfully!', user: userData });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },
};

module.exports = authController;
