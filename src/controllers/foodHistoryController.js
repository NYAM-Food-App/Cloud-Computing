const { db } = require('../services/firebaseService');

// Fungsi untuk menampilkan riwayat makanan pengguna
const getFoodHistory = async (req, res) => {
    const { uid } = req.params;

    try {
        // Ambil dokumen user dari Firestore
        const userDocRef = db.collection('users').doc(uid);
        const userDoc = await userDocRef.get();

        // Jika user tidak ditemukan
        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Ambil foodHistory dari dokumen user
        const userData = userDoc.data();
        const foodHistory = userData.foodHistory || [];

        // Kirim data foodHistory ke pengguna
        return res.status(200).json({
            message: 'Food history retrieved successfully',
            foodHistory,
        });
    } catch (error) {
        console.error('Error fetching food history:', error.message || error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fungsi untuk menampilkan detail resep berdasarkan index yang dipilih
const getFoodHistoryDetail = async (req, res) => {
  const { uid, historyIndex } = req.params;

  try {
      // Ambil dokumen user dari Firestore
      const userDocRef = db.collection('users').doc(uid);
      const userDoc = await userDocRef.get();

      // Jika user tidak ditemukan
      if (!userDoc.exists) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Ambil foodHistory dari dokumen user
      const userData = userDoc.data();
      const foodHistory = userData.foodHistory || [];

      // Validasi indeks history yang dipilih
      if (historyIndex < 0 || historyIndex >= foodHistory.length) {
          return res.status(400).json({ error: 'Invalid history index' });
      }

      // Ambil detail makanan berdasarkan index
      const selectedHistory = foodHistory[historyIndex];

      // Kirim detail makanan ke pengguna
      return res.status(200).json({
          message: 'Food history detail retrieved successfully',
          selectedHistory,
      });
  } catch (error) {
      console.error('Error fetching food history detail:', error.message || error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getFoodHistory, getFoodHistoryDetail };