const { db } = require('../services/firebaseService');

const userModel = {
  // Create a new user in Firestore
  async createUser(uid, data) {
    return await db.collection('users').doc(uid).set(data);
  },

  // Retrieve user data from Firestore
  async getUser(uid) {
    const userDoc = await db.collection('users').doc(uid).get();
    return userDoc.exists ? userDoc.data() : null;
  },

  // Update user data in Firestore
  async updateUser(uid, data) {
    return await db.collection('users').doc(uid).update(data);
  },
};

module.exports = userModel;