const { getUserRecommendations, saveSelectedFood } = require('../models/foodModel');
const { downloadImageAndUpload } = require('../utils/imageUtils');
const { db, admin } = require('../services/firebaseService');

const chooseFood = async (req, res) => {
    const { uid } = req.params;
    const { selectedIndex } = req.body;

    try {
        // Ambil rekomendasi makanan user
        const foodRecommendations = await getUserRecommendations(uid);

        // Validasi indeks pilihan
        if (!Array.isArray(foodRecommendations) || selectedIndex < 0 || selectedIndex >= foodRecommendations.length) {
            return res.status(400).json({ error: 'Invalid selection index' });
        }

        // Ambil makanan yang dipilih
        const selectedFood = foodRecommendations[selectedIndex];

        // Periksa apakah makanan yang dipilih memiliki URL gambar
        if (!selectedFood.image) {
          return res.status(400).json({ error: 'Selected food does not have an image' });
      }

      // Unduh gambar dan simpan ke Google Cloud Storage
      const imageFileName = `${uid}-${selectedFood.foodname}.jpg`;  // Nama file gambar yang unik
      const publicImageUrl = await downloadImageAndUpload(selectedFood.image, imageFileName);  // Dapatkan URL gambar yang disimpan di Cloud Storage

      // Simpan pilihan makanan ke Firestore dan URL gambar yang telah diupload
      await saveSelectedFood(uid, selectedFood, publicImageUrl);

        // Tambahkan nilai nutrisi ke fulfilledNeeds
        const userDocRef = db.collection('users').doc(uid);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = userDoc.data();
        const currentFulfilledNeeds = userData.fulfilledNeeds || { calories: 0, fat: 0, carbs: 0, protein: 0 };

        const updatedFulfilledNeeds = {
            calories: currentFulfilledNeeds.calories + (selectedFood.fulfilledNeeds.calories || 0),
            fat: currentFulfilledNeeds.fat + (selectedFood.fulfilledNeeds.fat || 0),
            carbs: currentFulfilledNeeds.carbs + (selectedFood.fulfilledNeeds.carbs || 0),
            protein: currentFulfilledNeeds.protein + (selectedFood.fulfilledNeeds.protein || 0),
        };

        // Update fulfilledNeeds di Firestore
        await userDocRef.update({
            fulfilledNeeds: updatedFulfilledNeeds,
        });

        // Simpan riwayat makanan yang dipilih bersama waktu request
        const timestamp = admin.firestore.Timestamp.now();

        await userDocRef.update({
          foodHistory: admin.firestore.FieldValue.arrayUnion({
              selectedFood,
              imageUrl: publicImageUrl,  // Simpan URL gambar dari Cloud Storage
              timestamp,
          }),
      });

        // Kirim respons ke user
        return res.status(200).json({
            message: 'Food selection successful and fulfilled needs updated',
            selectedFood,
            updatedFulfilledNeeds,
            imageUrl: publicImageUrl,
        });
    } catch (error) {
        // Tangani error ketika user tidak ditemukan di Firestore
        if (error.message === 'User not found') {
            return res.status(404).json({ error: 'User not found' });
        }

        // Tangani kesalahan lainnya sebagai internal server error
        console.error('Error choosing food:', error.message || error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { chooseFood };
