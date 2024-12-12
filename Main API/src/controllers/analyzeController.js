const { sendImageToFoodRecognitionApi } = require('../utils/foodImageRecognitionUtils');
const { queryEdamamApi } = require('../utils/edamamApiUtils');
const { db, admin } = require('../services/firebaseService');

// Helper function to determine meal type based on time of day
const getMealType = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 0 && hour < 12) return ['Breakfast', 'Snack', 'Teatime', 'Dinner'];
    if (hour >= 12 && hour < 18) return ['Lunch', 'Snack', 'Teatime'];
    return ['Dinner', 'Snack', 'Teatime'];
};

// Helper function to calculate the remaining nutrient values
const getNutrientsQuery = (dailyNeeds = {}, fulfilledNeeds = {}) => {
    const nutrientsQuery = {};

    const calculateRange = (key) => {
        const dailyValue = dailyNeeds[key] || 0;
        const fulfilledValue = fulfilledNeeds[key] || 0;
        const remaining = dailyValue - fulfilledValue;
        return remaining > 0 ? `${remaining}` : null;
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

// Helper function to get a random subset of items from an array
const getRandomItems = (array, count) => {
    if (array.length <= count) return array;
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const analyzeFood = async (req, res) => {
    const { uid } = req.params;
    const { queryText } = req.body;
    const image = req.file;

    try {
        // Verify user in Firestore
        const userDocRef = db.collection('users').doc(uid);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found in Firestore' });
        }

        if (!image && !queryText) {
            return res.status(400).json({ error: 'No image or query text provided' });
        }

        const userData = userDoc.data();
        const health = userData.allergy || [];
        const cuisineType = ['South East Asian', 'Asian', 'Chinese', 'Indian', 'Japanese', 'Middle Eastern', 'Mediterranean'];
        const mealType = getMealType();
        const nutrients = getNutrientsQuery(userData.dailyNeeds, userData.fulfilledNeeds);

        // Predict food class
        let predictedClass = '';

        // If image is provided, analyze the image to get predictedClass
        let foodRecognitionResult = null;
        if (image) {
            try {
                foodRecognitionResult = await sendImageToFoodRecognitionApi(image);
                predictedClass = foodRecognitionResult.predicted_class;
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        }

        // If query text is provided, use it as predictedClass
        if (queryText) {
            predictedClass = queryText;
        }

        // Search recipes based on the prediction
        const edamamResponse = await queryEdamamApi(predictedClass, {
            health,
            cuisineType,
            mealType,
            nutrients,
        });

        if (!edamamResponse.hits || edamamResponse.hits.length === 0) {
            return res.status(200).json({
                message: 'No recipes found for the given prediction.',
                foodPrediction: {
                    predictedClass,
                    predictedProb: foodRecognitionResult?.predicted_prob || null,
                },
                recipes: [],
            });
        }

        // Get up to 5 random recipes
        const recipes = getRandomItems(edamamResponse.hits, 5).map((hit) => {
            const recipe = hit.recipe;

            // Select the best image based on priority
            const image =
                recipe.images?.LARGE?.url ||
                recipe.images?.REGULAR?.url ||
                recipe.images?.SMALL?.url ||
                recipe.images?.THUMBNAIL?.url ||
                null;

            // Clean up undefined data
            return {
                foodname: recipe.label || null,
                image,
                "source recipes": recipe.source || null,
                "how to cook": recipe.url || null,
                ingredients: recipe.ingredientLines || null,
                cuisineType: recipe.cuisineType || null,
                mealType: recipe.mealType || null,
                dishType: recipe.dishType || null, // Replace undefined with null
                fulfilledNeeds: {
                    calories: recipe.totalNutrients?.ENERC_KCAL?.quantity 
                        ? parseFloat(recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(2)) 
                        : 0,
                    fat: recipe.totalNutrients?.FAT?.quantity 
                        ? parseFloat(recipe.totalNutrients.FAT.quantity.toFixed(2)) 
                        : 0,
                    carbs: recipe.totalNutrients?.CHOCDF?.quantity 
                        ? parseFloat(recipe.totalNutrients.CHOCDF.quantity.toFixed(2)) 
                        : 0,
                    protein: recipe.totalNutrients?.PROCNT?.quantity 
                        ? parseFloat(recipe.totalNutrients.PROCNT.quantity.toFixed(2)) 
                        : 0,
                },
            };
        });

        // Save recommendations to Firestore
        await userDocRef.update({
            foodRecommendations: recipes,
            selectedFood: null, // Reset if any previous selection
        });

        // Respond to the user
        return res.status(200).json({
            message: 'Prediction and recipe retrieval successful',
            foodPrediction: {
                predictedClass,
                predictedProb: foodRecognitionResult ? foodRecognitionResult.predicted_prob : null,
            },
            recipes,
        });
    } catch (error) {
        console.error('Error:', error.message || error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { analyzeFood };
