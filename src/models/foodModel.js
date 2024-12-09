const { db, admin } = require('../services/firebaseService');

// Get food recommendations from Firestore
const getUserRecommendations = async (uid) => {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) throw new Error('User not found');
    return userDoc.data().foodRecommendations || [];
};

// Save selected food to Firestore
const saveSelectedFood = async (uid, selectedFood) => {
    const userDocRef = db.collection('users').doc(uid);
    await userDocRef.update({
        selectedFood,
        foodRecommendations: admin.firestore.FieldValue.delete(), // Remove recommendations after selection
    });
};

module.exports = { getUserRecommendations, saveSelectedFood };