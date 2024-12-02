const { admin } = require('../services/firebaseService');
const userModel = require('../models/userModel');
const { calculateBMI, calculateDailyNeeds } = require('../utils/nutritionUtils');
const { calculateAge } = require('../utils/dateUtils');
const { calculateBMRRate } = require('../utils/bmrUtils');

const authController = {
  /**
   * Login menggunakan ID Token dari Firebase Authentication
   */
  async login(req, res) {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        return res.status(400).json({ message: 'ID Token is required' });
      }

      // Verifikasi ID Token menggunakan Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid, email, picture, name } = decodedToken;

      // Periksa apakah pengguna sudah terdaftar di Firestore
      let user = await userModel.getUser(uid);

      if (!user) {
        // Jika pengguna belum terdaftar, daftarkan secara otomatis
        const userData = {
          fullname: name || '',
          email: email || '',
          profilePicture: picture || '',
          createdAt: new Date().toISOString(),
        };
        await userModel.createUser(uid, userData);
        user = userData; // Simpan data pengguna yang baru terdaftar
      }

      // Balas respons dengan data pengguna
      res.status(200).json({
        message: 'Login successful',
        uid,
        user,
      });
    } catch (error) {
      res.status(401).json({ message: 'Invalid ID Token', error: error.message });
    }
  },

  /**
   * Register pengguna baru dengan data tambahan
   */
  async register(req, res) {
    try {
      const { uid, fullname, birthdate, gender, allergy, height, weight } = req.body;
  
      // Validasi input
      if (!uid || !fullname || !birthdate || gender === undefined || !height || !weight) {
        return res.status(400).json({ message: 'All required fields must be filled!' });
      }
  
      // Verifikasi UID dengan Firebase Authentication
      let userRecord;
      try {
        userRecord = await admin.auth().getUser(uid); // Mendapatkan data user dari Firebase Auth
        console.log('User verified:', userRecord.email); // Logging untuk debugging
      } catch (error) {
        return res.status(401).json({ message: 'Invalid UID: User not found in Firebase Authentication' });
      }
  
      // Hitung usia berdasarkan birthdate
      const age = calculateAge(birthdate);

      // Hitung BMI
      const bmi = calculateBMI(weight, height);

      // Hitung BMR Rate menggunakan API eksternal
      const bmrRate = await calculateBMRRate(gender, height, weight, bmi);


      // Data untuk Firestore
      const userData = {
        fullname,
        email: userRecord.email || null, // Email dari Firebase Authentication
        profilePicture: userRecord.photoURL || null, // Foto profil dari Firebase Authentication
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
  
      // Simpan data pengguna ke Firestore
      await userModel.createUser(uid, userData);
      res.status(201).json({ message: 'User registered successfully!', user: userData });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },  
};

module.exports = authController;
