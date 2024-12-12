const admin = require('firebase-admin');

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'your gcp-project-id',
});
const db = admin.firestore();

// Fungsi untuk mereset field fulfilledNeeds
exports.resetFulfilledNeeds = async (event, context) => {
  const collectionName = 'users';
  const resetFields = {
    'fulfilledNeeds.calories': 0,
    'fulfilledNeeds.carbs': 0,
    'fulfilledNeeds.fat': 0,
    'fulfilledNeeds.protein': 0,
  };

  try {
    // Ambil semua dokumen dari koleksi 'users'
    const snapshot = await db.collection(collectionName).get();

    if (snapshot.empty) {
      console.log(`Koleksi '${collectionName}' kosong. Tidak ada yang perlu direset.`);
      return;
    }

    // Lakukan operasi batch untuk mereset setiap dokumen
    const batch = db.batch();
    snapshot.forEach((doc) => {
      const docRef = doc.ref;
      batch.update(docRef, resetFields);
    });

    // Commit batch update
    await batch.commit();
    console.log(`Field 'fulfilledNeeds' pada semua dokumen di koleksi '${collectionName}' berhasil direset.`);
  } catch (error) {
    console.error('Terjadi kesalahan saat mereset data:', error);
  }
};
