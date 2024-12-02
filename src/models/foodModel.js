const { db, admin } = require('../services/firebaseService');

// Ambil rekomendasi makanan dari Firestore
const getUserRecommendations = async (uid) => {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) throw new Error('User not found');
    return userDoc.data().foodRecommendations || [];
};

// Simpan pilihan makanan ke Firestore
const saveSelectedFood = async (uid, selectedFood) => {
    const userDocRef = db.collection('users').doc(uid);
    await userDocRef.update({
        selectedFood,
        foodRecommendations: admin.firestore.FieldValue.delete(), // Hapus rekomendasi setelah dipilih
    });
};

module.exports = { getUserRecommendations, saveSelectedFood };
