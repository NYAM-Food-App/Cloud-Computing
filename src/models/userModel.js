const { db } = require('../services/firebaseService');

const userModel = {
  async createUser(uid, data) {
    return await db.collection('users').doc(uid).set(data);
  },

  async getUser(uid) {
    const userDoc = await db.collection('users').doc(uid).get();
    return userDoc.exists ? userDoc.data() : null;
  },

  async updateUser(uid, data) {
    return await db.collection('users').doc(uid).update(data);
  },
};

module.exports = userModel;
