const { sendImageToFoodRecognitionApi } = require('../utils/foodImageRecognitionUtils');
const { queryEdamamApi } = require('../utils/edamamApiUtils');
const { db, admin } = require('../services/firebaseService');

// Helper function to determine meal type based on time
const getMealType = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 0 && hour < 12) return ['Breakfast', 'Snack', 'Teatime', 'Dinner'];
    if (hour >= 12 && hour < 18) return ['Lunch', 'Snack', 'Teatime'];
    return ['Dinner', 'Snack', 'Teatime'];
};

// Helper function to calculate nutrients query
const getNutrientsQuery = (dailyNeeds = {}, fulfilledNeeds = {}) => {
    const nutrientsQuery = {};

    const calculateRange = (key) => {
        const dailyValue = dailyNeeds[key] || 0; // Ambil nilai dari map, default ke 0 jika tidak ada
        const fulfilledValue = fulfilledNeeds[key] || 0; // Ambil nilai dari map, default ke 0 jika tidak ada
        const remaining = dailyValue - fulfilledValue;
        return remaining > 0 ? `${remaining}` : null; // Hanya kirim jika nilai positif
    };

    const carbs = calculateRange('carbs');
    if (carbs) nutrientsQuery['CHOCDF'] = carbs;

    const calories = calculateRange('calories');
    if (calories) nutrientsQuery['ENERC_KCAL'] = calories;

    const fat = calculateRange('fat');
    if (fat) nutrientsQuery['FAT'] = fat;

    const protein = calculateRange('protein');
    if (protein) nutrientsQuery['PROCNT'] = protein;
    return nutrientsQuery;
};

const analyzeFood = async (req, res) => {
    const { uid } = req.params;
    const image = req.file;

    try {
        // Waktu request dalam format Firestore Timestamp
        const requestTime = admin.firestore.Timestamp.now();

        // Verifikasi pengguna di Firestore
        const userDocRef = db.collection('users').doc(uid);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found in Firestore' });
        }

        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }

        const userData = userDoc.data();
        const health = userData.allergy || [];
        const cuisineType = ['South East Asian', 'Asian', 'Chinese', 'Indian', 'Japanese', 'Middle Eastern', 'Mediterranean'];
        const mealType = getMealType();
        const nutrients = getNutrientsQuery(userData.dailyNeeds, userData.fulfilledNeeds);

        // Prediksi makanan
        const foodRecognitionResult = await sendImageToFoodRecognitionApi(image);
        if (!foodRecognitionResult.predicted_class) {
            return res.status(400).json({ error: 'Failed to predict food' });
        }

        const predictedClass = foodRecognitionResult.predicted_class;

        // Pencarian resep berdasarkan prediksi
        const edamamResponse = await queryEdamamApi(predictedClass, {
            health,
            cuisineType,
            mealType,
            nutrients,
        });

        // Ambil maksimal 5 resep dan format hasilnya
        const recipes = edamamResponse.hits.slice(0, 5).map((hit) => {
            const recipe = hit.recipe;

            // Pilih gambar terbaik berdasarkan prioritas
            const image =
                recipe.images?.LARGE?.url ||
                recipe.images?.REGULAR?.url ||
                recipe.images?.SMALL?.url ||
                recipe.images?.THUMBNAIL?.url ||
                null;

            // Bersihkan data undefined
            return {
                foodname: recipe.label || null,
                image,
                "source recipes": recipe.source || null,
                "how to cook": recipe.url || null,
                ingredients: recipe.ingredientLines || null,
                cuisineType: recipe.cuisineType || null,
                mealType: recipe.mealType || null,
                dishType: recipe.dishType || null, // Ganti undefined dengan null
                fulfilledNeeds: {
                    calories: recipe.totalNutrients?.ENERC_KCAL?.quantity || 0,
                    fat: recipe.totalNutrients?.FAT?.quantity || 0,
                    carbs: recipe.totalNutrients?.CHOCDF?.quantity || 0,
                    protein: recipe.totalNutrients?.PROCNT?.quantity || 0,
                },
            };
        });

        // Simpan rekomendasi ke Firestore
        await userDocRef.update({
            foodRecommendations: recipes,
            selectedFood: null, // Reset jika ada pilihan sebelumnya
        });

        // Respon ke pengguna
        return res.status(200).json({
            message: 'Prediction and recipe retrieval successful',
            requestTime: requestTime.toDate(), // Format sebagai ISO Date untuk pengguna
            foodPrediction: {
                predictedClass,
                predictedProb: foodRecognitionResult.predicted_prob,
            },
            recipes,
        });
    } catch (error) {
        console.error('Error:', error.message || error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { analyzeFood };

